export interface Thread {
  id: string;
  algorithmId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Message {
  id: string;
  content: string;
  type: 'chat' | 'hint';
  context?: MessageContext;
  role: 'user' | 'assistant';
  parentId: string | null;
  timestamp: number;
}

export interface MessageContext {
  prompt?: 'hint-prompt';
  files?: ContextFile[];
}

export interface ContextFile {
  name: string;
  description: string;
  content: string;
}
