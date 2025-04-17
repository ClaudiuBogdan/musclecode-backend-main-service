import { tool } from '@langchain/core/tools';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { z } from 'zod';

const logger = new StructuredLogger('SearchTool');

export const searchTool = tool(
  async (input: { query: string }) => {
    // Ensure Promise<string> return type
    let query: string;

    // Determine the actual query string based on input type
    if (typeof input === 'string') {
      logger.log('Received input as string.');
      // Option 1: Assume the string *is* the query
      query = input;
      // Option 2: Still try to parse if it looks like JSON (less common now)
      /*
   try {
     if (input.trim().startsWith('{')) {
       const parsed = JSON.parse(input);
       query = parsed.query || input; // Fallback if 'query' property missing
     } else {
       query = input;
     }
   } catch {
     query = input; // Fallback to raw string on parse error
   }
   */
    } else if (
      typeof input === 'object' &&
      input !== null &&
      typeof input.query === 'string'
    ) {
      logger.log('Received input as object with query property.');
      query = input.query;
    } else {
      // Fallback if input is unexpected type
      logger.warn(
        `Unexpected input type received: ${typeof input}. Using string representation.`,
      );
      query = String(input);
    }

    if (!query) {
      logger.error('Could not determine a valid query from input');
      return 'Error: Could not determine a valid query from the input.';
    }

    logger.log(`Executing search for query: "${query}"`);

    // --- Wrap core logic in try/catch ---
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let result = `No results found for "${query}".`;
      if (
        query.toLowerCase().includes('nest.js') ||
        query.toLowerCase().includes('nestjs')
      ) {
        result =
          'Nest.js is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.';
      } else if (query.toLowerCase().includes('langchain')) {
        result =
          'LangChain is a framework designed to simplify the creation of applications using large language models (LLMs).';
      } else if (query.toLowerCase().includes('weather')) {
        result = `Simulated weather result for "${query}": Sunny, 25°C.`;
      } else if (query.toLowerCase().includes('google gemini')) {
        result =
          "Google Gemini is Google's multimodal AI model that can understand and combine different types of information like text, code, audio, image and video.";
      }

      logger.log(`Search result: "${result}"`);
      return result; // Return the result as a string
    } catch (error: any) {
      logger.error(
        `Error during search tool execution for query "${query}": ${error.message}`,
        error,
      );
      // Return an error message string back to Langchain/LLM
      return `Error executing search for query "${query}": ${error.message}`;
    }
    // --- End Placeholder ---
  },
  {
    name: 'search',

    description:
      'Searches the web for information based on a query. Returns relevant snippets.',
    schema: z.object({
      query: z.string().describe('The query to search for.'),
    }),
  },
);
