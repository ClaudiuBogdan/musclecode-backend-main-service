import { plainToInstance, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  validateSync,
} from 'class-validator';
import { InteractionBody } from '../entities/interaction.entity';

// Event types enum for better type safety
export enum EventType {
  QUIZ_ANSWER = 'quiz_answer',
  QUESTION_SUBMIT = 'question_submit',
  // FLASHCARD_FLIP = 'flashcard_flip', // Future event type
}

// Base payload interface
export interface BaseEventPayload {
  timestamp: string;
}

// Specific payload DTOs
export class QuizAnswerPayloadDto implements BaseEventPayload {
  @IsString()
  @IsUUID()
  quizId: string;

  @IsNumber()
  selectedOption: number;

  @IsBoolean()
  isCorrect: boolean;

  @IsString()
  @IsISO8601()
  timestamp: string;
}

export class QuestionSubmitPayloadDto implements BaseEventPayload {
  @IsString()
  @IsUUID()
  questionId: string;

  @IsString()
  @MaxLength(1000)
  @IsNotEmpty()
  userAnswer: string;

  @IsNumber()
  score: number;

  @IsNumber()
  maxScore: number;

  @IsBoolean()
  isCorrect: boolean;

  @IsString()
  @IsISO8601()
  timestamp: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeedbackItemDto)
  feedbackItems: FeedbackItemDto[];
}

export class FeedbackItemDto {
  @IsBoolean()
  isCorrect: boolean;

  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsNumber()
  points: number;
}

// Custom validator for event payload
export function IsValidEventPayload(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidEventPayload',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const event = args.object as EventDto;
          return validateEventPayload(event.type, value);
        },
        defaultMessage(args: ValidationArguments) {
          const event = args.object as EventDto;
          const errors = getPayloadValidationErrors(event.type, args.value);
          return `Invalid payload for event type '${event.type}': ${errors.join(', ')}`;
        },
      },
    });
  };
}

export class EventDto {
  @IsEnum(EventType, {
    message: `Event type must be one of: ${Object.values(EventType).join(', ')}`,
  })
  type: EventType;

  @IsObject()
  @IsValidEventPayload()
  payload: QuizAnswerPayloadDto | QuestionSubmitPayloadDto;
}

export class InteractionRequestDto {
  @IsUUID()
  nodeId: string;

  @ValidateNested()
  @Type(() => EventDto)
  event: EventDto;
}

export class InteractionResponseDto {
  @IsObject()
  data: {
    interaction: InteractionBody;
  };
}

// Validation helper functions
function validateEventPayload(type: EventType, payload: any): boolean {
  const DtoClass = getPayloadDtoClass(type);
  if (!DtoClass) return false;

  const validated = plainToInstance(DtoClass, payload);
  const errors = validateSync(validated as object);
  return errors.length === 0;
}

function getPayloadValidationErrors(type: EventType, payload: any): string[] {
  const DtoClass = getPayloadDtoClass(type);
  if (!DtoClass) return [`Unknown event type: ${type}`];

  const validated = plainToInstance(DtoClass, payload);
  const errors = validateSync(validated as object);
  return errors
    .map((error) => Object.values(error.constraints || {}).join(', '))
    .filter(Boolean);
}

function getPayloadDtoClass(type: EventType): any {
  const payloadClassMap = {
    [EventType.QUIZ_ANSWER]: QuizAnswerPayloadDto,
    [EventType.QUESTION_SUBMIT]: QuestionSubmitPayloadDto,
    // [EventType.FLASHCARD_FLIP]: FlashcardFlipPayloadDto, // Future
  };

  return payloadClassMap[type];
}

// Type guards for better type safety
export function isQuizAnswerEvent(
  event: EventDto,
): event is EventDto & { payload: QuizAnswerPayloadDto } {
  return event.type === EventType.QUIZ_ANSWER;
}

export function isQuestionSubmitEvent(
  event: EventDto,
): event is EventDto & { payload: QuestionSubmitPayloadDto } {
  return event.type === EventType.QUESTION_SUBMIT;
}

// Factory function for creating typed events
export function createTypedEvent<T extends EventType>(
  type: T,
  payload: T extends EventType.QUIZ_ANSWER
    ? QuizAnswerPayloadDto
    : T extends EventType.QUESTION_SUBMIT
      ? QuestionSubmitPayloadDto
      : never,
): EventDto {
  return { type, payload } as EventDto;
}
