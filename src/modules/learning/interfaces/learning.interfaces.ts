// Base model interfaces.
export interface ContentNode {
  id: string;
  userId: string;
  type: ContentType;
  status: ContentStatus;
  body: ModuleContentBody | LessonContentBody; // TODO: Define the body type
}

export interface ContentLink {
  id: string;
  fromId: string;
  toId: string;
  linkType: LinkType;
}

export interface InteractionData {
  id: string;
  type: InteractionType;
  body: any; // TODO: Define the body type
}

// Content model interfaces.

export interface ModuleContentNode extends ContentNode {
  type: 'MODULE';
  body: ModuleContentBody;
  outgoingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
  incomingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
}

export interface ModuleContentBody {
  title: string;
  description: string;
}

export interface ModuleLink extends ContentLink {
  metadata: {
    type: 'MODULE';
    title: string;
    description: string;
    status: ContentStatus;
  };
}

// Lesson model interfaces.

export interface LessonContentNode extends ContentNode {
  type: 'LESSON';
  body: LessonContentBody;
  outgoingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
  incomingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
}

export interface LessonContentBody {
  title: string;
  description: string;
  content: string;
  version: number;
}

export interface LessonLink extends ContentLink {
  metadata: {
    type: 'LESSON';
    title: string;
    description: string;
    status: ContentStatus;
    version: number;
  };
}

// Exercise model interfaces.
export interface ExerciseContentNode extends ContentNode {
  type: 'EXERCISE';
  body: ExerciseContentBody;
  outgoingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
  incomingLinks: (ModuleLink | LessonLink | ExerciseLink)[];
}

export interface ExerciseContentBody {
  title: string;
  description: string;
  content: string;
  status: ContentStatus;
  version: number;
}

export interface ExerciseLink extends ContentLink {
  metadata: {
    type: 'EXERCISE';
    title: string;
    description: string;
    status: ContentStatus;
    version: number;
  };
}

export type ContentType =
  | 'MODULE'
  | 'LESSON'
  | 'EXERCISE'
  | 'CHAT_THREAD'
  | 'ALGORITHM'
  | 'NOTE';

export type InteractionType = 'QUIZ' | 'FLASHCARD';
export type LinkType = 'REFERENCE' | 'DEPENDENCY' | 'RELATES_TO' | 'EXTENDS';
export type ContentStatus = 'DRAFT' | 'CREATED' | 'ARCHIVED';
