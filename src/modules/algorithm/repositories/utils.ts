import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';
import { SchedulingState } from 'src/modules/scheduler/types/scheduler.types';

export const serializeScheduleData = (
  scheduleData: SchedulingState,
): InputJsonValue => {
  return {
    ...scheduleData,
    due: scheduleData.due.toISOString(),
    lastReview: scheduleData.lastReview.toISOString(),
  };
};

export const deserializeScheduleData = (scheduleData: JsonValue): SchedulingState => {
  const data = scheduleData as Record<string, unknown>;
  return {
    ...(data as Omit<SchedulingState, 'due' | 'lastReview'>),
    due: new Date((data.due as string) || new Date().toISOString()),
    lastReview: new Date((data.lastReview as string) || new Date().toISOString()),
  };
};
