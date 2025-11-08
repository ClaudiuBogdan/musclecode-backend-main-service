declare module '@langchain/core/prompts' {
  export class ChatPromptTemplate {
    static fromMessages(messages: unknown[]): ChatPromptTemplate;
    formatMessages(values: Record<string, unknown>): Promise<unknown[]>;
    invoke(values: Record<string, unknown>): Promise<unknown>;
  }

  export class SystemMessagePromptTemplate {
    static fromTemplate(template: string): SystemMessagePromptTemplate;
  }

  export class HumanMessagePromptTemplate {
    static fromTemplate(template: string): HumanMessagePromptTemplate;
  }

  export class PromptTemplate {
    static fromTemplate(template: string): PromptTemplate;
    format(values: Record<string, unknown>): Promise<string>;
  }
}

declare module '@langchain/core/callbacks/dispatch' {
  export function dispatchCustomEvent(
    eventName: string,
    data: unknown,
    config?: unknown
  ): Promise<void>;
}
