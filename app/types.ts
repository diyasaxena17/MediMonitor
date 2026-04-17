export interface MedicationLog {
  id: string;
  timestamp: Date;
  taken: boolean;
  note?: string;
}
