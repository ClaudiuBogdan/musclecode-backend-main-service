import axios, { AxiosInstance } from 'axios';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SearchParams, SearchProvider, SearchResult } from './interfaces';

export class BraveSearchProvider implements SearchProvider {
  private client: AxiosInstance;
  private logger = new StructuredLogger('BraveSearchProvider');

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Brave Search API key is required.');
    }
    this.client = axios.create({
      baseURL: 'https://api.search.brave.com/res/v1', // :contentReference[oaicite:6]{index=6}
      headers: {
        Accept: 'application/json', // :contentReference[oaicite:7]{index=7}
        'X-Subscription-Token': apiKey, // :contentReference[oaicite:8]{index=8}
      },
    });
    this.logger.log('BraveSearchProvider initialized.');
  }

  async search(params: SearchParams): Promise<SearchResult[]> {
    const { query, maxResults = 5, includeDomains } = params;
    this.logger.log(`Executing Brave search: "${query}"`);

    // Inject site: filters if domains specified
    let q = query;
    if (includeDomains && includeDomains.length) {
      const filters = includeDomains.map((d) => `site:${d}`).join(' ');
      q = `${q} ${filters}`;
    }

    // Call Brave Web Search endpoint
    const response = await this.client.get('/web/search', {
      params: { q, count: maxResults }, // :contentReference[oaicite:9]{index=9}
    });

    const items: any[] = response.data.web?.results || []; // :contentReference[oaicite:10]{index=10}

    // Map to your standardized shape
    const results: SearchResult[] = items.map((item) => ({
      url: item.url,
      title: item.title,
      content: item.description ?? item.snippet ?? '',
    }));
    this.logger.log(`Brave returned ${results.length} items for "${query}"`);
    return results;
  }
}
