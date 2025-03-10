export interface ThreadResponse {
  id: string;
  algorithmId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageResponse {
  id: string;
  threadId: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'assistant';
  status: 'pending' | 'streaming' | 'complete' | 'error';
  parentId: string | null;
  votes?: {
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down';
  };
}

export interface Message {
  content: string;
  sender: 'user' | 'assistant';
}
