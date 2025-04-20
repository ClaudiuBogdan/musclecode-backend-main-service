import { tool } from '@langchain/core/tools';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { RunnableConfig } from '@langchain/core/runnables';
import { tavily } from '@tavily/core';

const logger = new StructuredLogger('SearchTool');

const searchToolSchema = z.object({
  query: z.string().min(5).describe('The query to search for.'),
  includeDomains: z
    .array(z.string())
    .optional()
    .describe(
      'The domains to include in the search. Include domains only if provided in the user prompt.',
    ),
});

type SearchToolSchemaType = z.infer<typeof searchToolSchema>;

export const createSearchTool = (travilyApiKey: string) =>
  tool(
    async (
      input: SearchToolSchemaType,
      config: RunnableConfig,
    ): Promise<string> => {
      const { query } = input;
      logger.log(`Executing search for query \"${query}\"`);
      try {
        await dispatchCustomEvent(
          'input_json_delta',
          {
            type: 'input_json_delta',
            partial_json: JSON.stringify(input),
          },
          config,
        );

        // Validate input
        if (!query.trim()) {
          throw new Error('Query must not be empty');
        }
        const tvly = tavily({ apiKey: travilyApiKey });
        const response = await tvly.search(query, {
          searchDepth: 'basic',
          maxResults: 3,
          includeImages: false,
          includeRawContent: true,
          includeDomains: input.includeDomains,
        });

        logger.log(
          `Found ${response.results.length} results for query \"${query}\"`,
        );

        // Return JSON stringified results for downstream LLM consumption
        return JSON.stringify({ query, results: response.results });
      } catch (error: any) {
        logger.error(
          `Error during search tool execution for query \"${query}\": ${error.message}`,
          error,
        );
        // Return error message back to Langchain/LLM
        return `Error executing search for query \"${query}\": ${error.message}`;
      }
    },
    {
      name: 'search',
      description:
        'Searches the web for up-to-date information based on a query. Returns relevant snippets. Should be used for getting information about modules, lessons, exercises, etc.',
      schema: zodToJsonSchema(searchToolSchema),
    },
  );
