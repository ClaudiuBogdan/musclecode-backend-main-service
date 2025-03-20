import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { DynamicTool } from '@langchain/core/tools';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import axios from 'axios';

interface ResearchResult {
  content: string;
  sources: {
    title: string;
    url: string;
  }[];
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

@Injectable()
export class ContentResearchAgent {
  private readonly logger = new Logger(ContentResearchAgent.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4',
      temperature: 0.2,
    });
  }

  /**
   * Searches the web for relevant information on a topic
   */
  private createWebSearchTool(): DynamicTool {
    return new DynamicTool({
      name: 'web_search',
      description: 'Search the web for information on a specific topic',
      func: async (query: string): Promise<string> => {
        try {
          const SERP_API_KEY = this.configService.get<string>('SERP_API_KEY');
          if (!SERP_API_KEY) {
            throw new Error('SERP API key not configured');
          }

          const response = await axios.get('https://serpapi.com/search', {
            params: {
              q: query,
              api_key: SERP_API_KEY,
            },
          });

          // Extract organic results from the search
          const results = response.data.organic_results
            ? response.data.organic_results.slice(0, 5).map((r: any) => ({
                title: r.title,
                url: r.link,
                snippet: r.snippet,
              }))
            : [];

          return JSON.stringify({
            results,
            message: `Found ${results.length} results for query: ${query}`,
          });
        } catch (error) {
          this.logger.error(
            `Error searching the web: ${error.message}`,
            error.stack,
          );
          return JSON.stringify({
            results: [],
            message: `Error searching the web: ${error.message}`,
          });
        }
      },
    });
  }

  /**
   * Researches content for a specific topic
   * @param topic The topic to research
   * @param subtopics Optional subtopics to research in more detail
   */
  async researchContent(
    topic: string,
    subtopics: string[] = [],
  ): Promise<ResearchResult> {
    try {
      const webSearchTool = this.createWebSearchTool();

      // Create prompt for research
      const researchPrompt = PromptTemplate.fromTemplate(`
        You are an expert educational researcher. Your task is to gather accurate, up-to-date information 
        about the following topic for an educational course:
        
        TOPIC: {topic}
        
        SUBTOPICS: {subtopics}

        Use the web_search tool to find relevant information. Focus on finding:
        1. Current and accurate information from reliable sources
        2. Comprehensive overviews of main concepts
        3. Examples that clarify difficult concepts
        4. Common misconceptions
        5. Best practices and industry standards

        After gathering information, compile it into a comprehensive report.
        For each piece of information, cite the source with title and URL.
      `);

      const formattedPrompt = await researchPrompt.format({
        topic,
        subtopics:
          subtopics.length > 0 ? subtopics.join(', ') : 'None specified',
      });

      // Simplified research process without full agent implementation
      // In a real implementation, this would use a more sophisticated agent framework
      const stringOutputParser = new StringOutputParser();

      // First, get the search queries we need to make
      const searchQueryPrompt = PromptTemplate.fromTemplate(`
        Generate 3-5 specific search queries that would help gather comprehensive information about:
        TOPIC: {topic}
        SUBTOPICS: {subtopics}
        
        Format the output as a JSON array of strings.
      `);

      const formattedQueryPrompt = await searchQueryPrompt.format({
        topic,
        subtopics:
          subtopics.length > 0 ? subtopics.join(', ') : 'None specified',
      });

      const searchQueriesJson = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedQueryPrompt);
      let searchQueries: string[] = [];

      try {
        searchQueries = JSON.parse(searchQueriesJson);
      } catch (error) {
        // If parsing fails, extract queries using regex
        const matches = searchQueriesJson.match(/"([^"]*)"/g);
        if (matches) {
          searchQueries = matches.map((match) => match.replace(/"/g, ''));
        } else {
          // Fallback to a single query
          searchQueries = [topic];
        }
      }

      // Execute searches
      const searchResults = await Promise.all(
        searchQueries.map(async (query) => {
          const result = await webSearchTool.invoke(query);
          return { query, result };
        }),
      );

      // Compile research
      const compilationPrompt = PromptTemplate.fromTemplate(`
        Based on the following search results, compile comprehensive educational content 
        about {topic} that can be used in a course. Include accurate information, examples, 
        and practical applications.
        
        SEARCH RESULTS:
        {searchResults}
        
        Your response should be structured as follows:
        1. Comprehensive content about the topic (at least 1000 words)
        2. A JSON array of sources at the end in the format: 
           [{"title": "Source Title", "url": "https://source-url.com"}]
      `);

      const formattedCompilationPrompt = await compilationPrompt.format({
        topic,
        searchResults: JSON.stringify(searchResults),
      });

      const researchOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedCompilationPrompt);

      // Extract content and sources
      let content = researchOutput;
      let sources: any[] = [];

      // Try to extract sources from the end of the content
      const sourcesMatch = researchOutput.match(/\[\s*{\s*"title".*}]\s*$/s);
      if (sourcesMatch) {
        try {
          sources = JSON.parse(sourcesMatch[0]);
          // Remove the sources JSON from the content
          content = researchOutput.substring(0, sourcesMatch.index!).trim();
        } catch (e) {
          this.logger.warn('Failed to parse sources from research output', e);
        }
      }

      return {
        content,
        sources: sources.map((s) => ({
          title: s.title || 'Unknown source',
          url: s.url || '#',
        })),
      };
    } catch (error) {
      this.logger.error(
        `Error researching content: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
