import axios, { AxiosInstance } from 'axios';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SearchParams, SearchProvider, SearchResult } from './interfaces';

export class PerplexitySearchProvider implements SearchProvider {
  private client: AxiosInstance;
  private logger = new StructuredLogger('PerplexitySearchProvider');

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Perplexity API key is required.');
    }
    this.client = axios.create({
      baseURL: 'https://api.perplexity.ai', // base URL for Sonar API :contentReference[oaicite:4]{index=4}
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`, // Bearer token auth :contentReference[oaicite:5]{index=5}
      },
    });
    this.logger.log('PerplexitySearchProvider initialized.');
  }

  async search(params: SearchParams): Promise<SearchResult[]> {
    const { query, maxResults = 5, includeDomains } = params;
    this.logger.log(`Executing Perplexity search: "${query}"`);

    // Build the payload
    const body: any = {
      model: 'sonar', // lightweight, search‑optimized model :contentReference[oaicite:6]{index=6}
      messages: [
        {
          role: 'system',
          content:
            'You are a search assistant that returns structured sources.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
      top_k: 0, // no token filtering beyond default :contentReference[oaicite:7]{index=7}
      return_images: false, // we only want URLs/text :contentReference[oaicite:8]{index=8}
      return_related_questions: false, // omit related questions :contentReference[oaicite:9]{index=9}
      web_search_options: { search_context_size: 'medium' }, // balanced context size :contentReference[oaicite:10]{index=10}
    };

    // Apply domain allow‑/deny‑listing via site: filters
    if (includeDomains && includeDomains.length) {
      body.search_domain_filter = includeDomains; // up to 10 domains; prefix with '-' to exclude :contentReference[oaicite:11]{index=11}
    }

    // Execute the API call
    const response = await this.client.post('/chat/completions', body); // POST /chat/completions :contentReference[oaicite:12]{index=12}
    const data = response.data;

    // Map any provided structured sources, else fall back to the main answer
    const sources: any[] = data.sources || []; // some SDKs unwrap sources array :contentReference[oaicite:13]{index=13}
    const resultsFromSources: SearchResult[] = sources.map((src) => ({
      url: src.url,
      title: src.title,
      content: src.snippet || src.content || '',
    }));

    // Always include the primary answer as a result
    const answer = data.choices?.[0]?.message?.content || '';
    const mainResult: SearchResult = {
      url: '',
      title: 'Perplexity Answer',
      content: answer,
    };

    // Combine and respect the maxResults limit
    const combined = [...resultsFromSources, mainResult];
    return combined.slice(0, maxResults); // trim to desired length :contentReference[oaicite:14]{index=14}
  }
}
