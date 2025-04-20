/**
 * Enum to specify the desired search engine.
 */
export enum SearchEngine {
  TAVILY = 'tavily',
  BRAVE = 'brave',
  PERPLEXITY = 'perplexity',
  JINA = 'jina',
}

/**
 * Standardized parameters for any search provider.
 */
export interface SearchParams {
  query: string;
  maxResults?: number;
  includeDomains?: string[];
  // Add other common parameters if needed across providers
}

/**
 * Standardized structure for a single search result.
 */
export interface SearchResult {
  url: string;
  title: string;
  content: string; // Snippet or raw content
  // Optional: score?: number; // If providers return relevance scores
}

/**
 * Interface for a search provider implementation.
 */
export interface SearchProvider {
  search(params: SearchParams): Promise<SearchResult[]>;
}

export interface SearchToolConfig {
  tavilyApiKey?: string;
  braveApiKey?: string;
  perplexityApiKey?: string;
  jinaApiKey?: string; // May not be needed depending on Jina's auth
}
