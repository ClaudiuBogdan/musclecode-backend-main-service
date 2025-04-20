import axios, { AxiosInstance } from 'axios';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SearchParams, SearchProvider, SearchResult } from './interfaces';

export class TavilySearchProvider implements SearchProvider {
  private client: AxiosInstance;
  private logger = new StructuredLogger('TavilySearchProvider');

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Tavily API key is required.');
    }
    // Initialize Axios client with base URL and headers
    this.client = axios.create({
      baseURL: 'https://api.tavily.com', // Tavily Search base URL :contentReference[oaicite:16]{index=16}
      headers: {
        Authorization: `Bearer ${apiKey}`, // Bearer token auth :contentReference[oaicite:17]{index=17}
        'Content-Type': 'application/json',
      },
    });
    this.logger.log('TavilySearchProvider initialized.');
  }

  async search(params: SearchParams): Promise<SearchResult[]> {
    this.logger.log(`Executing Tavily search for query "${params.query}"`);

    // Build request body
    const body: any = {
      query: params.query,
      topic: 'general',
      search_depth: 'basic',
      max_results: params.maxResults ?? 5,
      include_answer: false,
      include_raw_content: true,
      include_images: false,
      include_image_descriptions: false,
      include_domains: params.includeDomains ?? [],
      exclude_domains: ['www.youtube.com'],
    };

    try {
      // Send POST /search
      const response = await this.client.post('/search', body);
      // Map results to SearchResult[]
      const items: any[] = response.data.results || [];
      const results: SearchResult[] = items.map((item) => ({
        url: item.url,
        title: item.title,
        content: item.content,
      }));
      this.logger.log(
        `Found ${results.length} results from Tavily for query "${params.query}"`,
      );
      return results;
    } catch (error: any) {
      const msg = `Error during Tavily search for query "${params.query}": ${error.message}`;
      this.logger.error(msg, error);
      throw new Error(msg);
    }
  }
}
