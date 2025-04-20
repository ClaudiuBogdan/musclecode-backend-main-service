import { SearchEngine, SearchProvider, SearchToolConfig } from './interfaces';
import { TavilySearchProvider } from './travily.search';
import { BraveSearchProvider } from './brave.search';
import { PerplexitySearchProvider } from './perplexity.search';
import { JinaSearchProvider } from './jina.search';

export function getSearchProvider(
  engine: SearchEngine,
  config: SearchToolConfig,
): SearchProvider {
  switch (engine) {
    case SearchEngine.TAVILY:
      if (!config.tavilyApiKey)
        throw new Error(
          'Tavily engine selected, but TAVILY_API_KEY is missing in config.',
        );
      return new TavilySearchProvider(config.tavilyApiKey);
    case SearchEngine.BRAVE:
      if (!config.braveApiKey)
        throw new Error(
          'Brave engine selected, but BRAVE_API_KEY is missing in config.',
        );
      // --- Uncomment when implemented ---
      return new BraveSearchProvider(config.braveApiKey);
    // throw new Error('Brave search provider not yet implemented.');
    case SearchEngine.PERPLEXITY:
      if (!config.perplexityApiKey)
        throw new Error(
          'Perplexity engine selected, but PERPLEXITY_API_KEY is missing in config.',
        );
      // --- Uncomment when implemented ---
      return new PerplexitySearchProvider(config.perplexityApiKey);
    // throw new Error('Perplexity search provider not yet implemented.');
    case SearchEngine.JINA:
      // Jina might not require a key, adjust logic if needed
      return new JinaSearchProvider(config.jinaApiKey || ''); // Pass empty string if key is optional
    // --- Uncomment when implemented ---
    // throw new Error('Jina AI search provider not yet implemented.');
    default:
      // Optional: Fallback to a default engine?
      // Or throw an error for unhandled engines.
      throw new Error(`Unsupported search engine: ${engine}`);
  }
}
