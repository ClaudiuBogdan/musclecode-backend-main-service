export interface Thread {
  id: string;
  algorithmId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface Message {
  id: string;
  threadId: string;
  content: string;
  timestamp: number;
  role: 'user' | 'assistant';
  parentId: string | null;
}
