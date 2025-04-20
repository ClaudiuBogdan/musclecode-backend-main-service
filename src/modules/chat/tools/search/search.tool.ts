import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { RunnableConfig } from '@langchain/core/runnables';
import { StructuredLogger } from 'src/logger/structured-logger.service';

const logger = new StructuredLogger(`SearchTool`);

import {
  SearchEngine,
  SearchParams,
  SearchResult,
  SearchToolConfig,
} from './interfaces';
import { getSearchProvider } from './provider';

// Define the updated schema including the search engine selector
const searchToolSchema = z.object({
  query: z.string().min(5).describe('The query to search for.'),
  // includeDomains: z
  //   .array(z.string())
  //   .optional()
  //   .describe(
  //     'A list of domains to specifically include in the search (if supported by the engine). Include only if provided in the user prompt.',
  //   ),
  // engine: z
  //   .nativeEnum(SearchEngine)
  //   .optional()
  //   .default(SearchEngine.TAVILY) // Default to Tavily if not specified
  //   .describe(
  //     `The search engine to use. Defaults to ${SearchEngine.TAVILY}. Available options: ${Object.values(SearchEngine).join(', ')}.`,
  //   ),
});

type SearchToolSchemaType = z.infer<typeof searchToolSchema>;

/**
 * Creates a Langchain tool for performing web searches using configurable search engines.
 *
 * @param {SearchToolConfig} searchConfig - Configuration object containing API keys for the enabled search providers.
 * @returns A Langchain tool instance.
 */
export const createSearchTool = (searchConfig: SearchToolConfig) =>
  tool(
    async (
      input: SearchToolSchemaType,
      config: RunnableConfig,
    ): Promise<string> => {
      const { query } = input;
      const includeDomains = undefined;
      const engine = SearchEngine.TAVILY;
      const maxResults = 3;

      logger.log(
        `Executing search with engine "${engine}" for query "${query}"`,
      );

      try {
        await dispatchCustomEvent(
          'input_json_delta',
          {
            type: 'input_json_delta',
            partial_json: JSON.stringify(input),
          },
          config,
        );

        if (!query || !query.trim()) {
          throw new Error('Query must not be empty');
        }

        const searchProvider = getSearchProvider(engine, searchConfig);
        const searchParams: SearchParams = {
          query: query.trim(),
          includeDomains,
          maxResults,
        };

        const results: SearchResult[] =
          await searchProvider.search(searchParams);

        const output = JSON.stringify({
          query: query,
          engine: engine,
          results: results,
        });

        logger.log(
          `Successfully completed search with engine "${engine}" for query "${query}". Found ${results.length} results.`,
        );
        return output;
      } catch (error: any) {
        // Log the error with context
        logger.error(
          `Error during search tool execution with engine "${engine}" for query "${query}": ${error.message}`,
          error, // Include stack trace if available/needed
        );

        return `Error executing search with engine "${engine}" for query "${query}": ${error.message}`;
      }
    },
    // --- Tool Metadata ---
    {
      name: 'search',
      description: `Searches the web using a specified engine (${Object.values(SearchEngine).join('/')}) for up-to-date information based on a query. Returns relevant snippets. Use the 'engine' parameter to choose the provider. Should be used for getting information about modules, lessons, exercises, current events, etc.`,
      schema: searchToolSchema, // Use the updated schema
    },
  );
