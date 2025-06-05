export type ItemId = string;

/**
 * Represents a single interaction event from the user for a specific interactive element.
 */
export interface InteractionEvent {
  eventId: string; // Unique ID for this specific event (e.g., uuid)
  timestamp: Date; // Timestamp of when the event occurred
  type: string; // Type of interaction event (e.g., 'quiz_attempt', 'answer_selected', 'flashcard_flip', 'progress_reset')
  payload: Record<string, any>; // Data specific to this event (e.g., { answer: "A", isCorrect: true })
}

/**
 * Stores the history of all interaction events for a single interactive element.
 * Events should be stored in chronological order.
 */
export interface ItemInteractionLog {
  events: InteractionEvent[];
}

/**
 * The overall structure stored in InteractionData.body for a user's interaction with a content node.
 * It maps each interactive element's ID (ItemId) within that node to its log of interaction events.
 */
export interface InteractionBody {
  version: '1.0'; // Schema version for future migrations
  items: {
    [key: ItemId]: ItemInteractionLog;
  };
}
