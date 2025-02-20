import { InputJsonValue } from '@prisma/client/runtime/library';
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

export const deserializeScheduleData = (scheduleData: any): SchedulingState => {
  return {
    ...scheduleData,
    due: new Date(scheduleData.due),
    lastReview: new Date(scheduleData.lastReview),
  };
};
