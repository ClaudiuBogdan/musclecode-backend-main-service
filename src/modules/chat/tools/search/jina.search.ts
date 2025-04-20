import axios, { AxiosInstance } from 'axios';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SearchParams, SearchProvider, SearchResult } from './interfaces';

export class JinaSearchProvider implements SearchProvider {
  private client: AxiosInstance;
  private logger = new StructuredLogger('JinaSearchProvider');

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error('Jina API key is required');
    }
    const headers: Record<string, string> = {
      Accept: 'application/json', // enable JSON mode :contentReference[oaicite:8]{index=8}
      Authorization: `Bearer ${apiKey}`,
      'X-Token-Budget': '50000',
    };
    this.client = axios.create({
      baseURL: 'https://s.jina.ai', // Jina Reader Search base URL :contentReference[oaicite:10]{index=10}
      headers,
    });
    this.logger.log('JinaSearchProvider initialized.');
  }

  async search(params: SearchParams): Promise<SearchResult[]> {
    const { query, maxResults = 5, includeDomains } = params;
    this.logger.log(`Executing Jina search for "${query}"`);

    // Build URL path and query params
    const path = `/?q=${encodeURIComponent(query)}&num=${maxResults}`;
    const queryParams: Record<string, string | string[]> = {};
    if (includeDomains?.length) {
      queryParams.site = includeDomains; // domain filtering via site=… :contentReference[oaicite:11]{index=11}
    }

    // Perform the GET request
    const response = await this.client.get(path, {
      params: queryParams,
    });
    // response.data is an array of { title, url, content } :contentReference[oaicite:12]{index=12}
    const entries: any[] = response.data.data as {
      title: string;
      url: string;
      content: string;
    }[];

    // Map to standardized SearchResult
    const results: SearchResult[] = entries.map((item) => ({
      url: item.url,
      title: item.title,
      content: item.content,
    }));

    this.logger.log(`Jina returned ${results.length} items for "${query}"`);
    return results.slice(0, maxResults); // enforce maxResults :contentReference[oaicite:13]{index=13}
  }
}
