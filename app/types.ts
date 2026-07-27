export interface MedicationSchedule {
  id: string;
  name: string;
  dosage: string;
  reminderTime: string;
  frequency: 'daily';
  notes?: string;
  createdAt: Date;
}

export interface MedicationLog {
  id: string;
  timestamp: Date;
  taken: boolean;
  note?: string;
}
