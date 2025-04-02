// Base model interfaces.
export interface ContentNode {
  id: string;
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
}

export interface LessonLink extends ContentLink {
  metadata: {
    type: 'LESSON';
    title: string;
    description: string;
    status: ContentStatus;
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
}

export interface ExerciseLink extends ContentLink {
  metadata: {
    type: 'EXERCISE';
    title: string;
    description: string;
    status: ContentStatus;
  };
}

export type ContentType = 'MODULE' | 'LESSON' | 'EXERCISE';
export type InteractionType = 'QUIZ' | 'FLASHCARD';
export type LinkType = 'REFERENCE' | 'DEPENDENCY' | 'RELATES_TO' | 'EXTENDS';
export type ContentStatus = 'DRAFT' | 'CREATED' | 'ARCHIVED';
