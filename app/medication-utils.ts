import { MedicationLog, MedicationSchedule } from './types';

export interface ScheduledDose {
  medication: MedicationSchedule;
  scheduledFor: Date;
  isOverdue: boolean;
}

const localDateKey = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');

const scheduledDateFor = (schedule: MedicationSchedule, date: Date) => {
  const [hours, minutes] = schedule.reminderTime.split(':').map(Number);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes,
  );
};

const doseWasLogged = (
  logs: MedicationLog[],
  medicationId: string,
  scheduledFor: Date,
) =>
  logs.some(
    (log) =>
      log.medicationId === medicationId &&
      log.scheduledFor &&
      localDateKey(new Date(log.scheduledFor)) === localDateKey(scheduledFor),
  );

export function getNextScheduledDose(
  schedules: MedicationSchedule[],
  logs: MedicationLog[],
  now: Date,
): ScheduledDose | null {
  const availableDoses = schedules
    .map((medication) => ({
      medication,
      scheduledFor: scheduledDateFor(medication, now),
    }))
    .filter(
      ({ medication, scheduledFor }) =>
        !doseWasLogged(logs, medication.id, scheduledFor),
    );

  const overdue = availableDoses
    .filter(({ scheduledFor }) => scheduledFor.getTime() <= now.getTime())
    .sort(
      (a, b) => b.scheduledFor.getTime() - a.scheduledFor.getTime(),
    );

  if (overdue.length > 0) {
    return { ...overdue[0], isOverdue: true };
  }

  const upcoming = availableDoses.sort(
    (a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime(),
  );

  return upcoming.length > 0
    ? { ...upcoming[0], isOverdue: false }
    : null;
}
