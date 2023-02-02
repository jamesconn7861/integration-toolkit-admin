export interface BenchRecord {
  id: string;
  switch: number;
  range: string;
  department: string;
  notes: string;
  locked: string;
  visibility: BenchVisCodes;
}

export enum BenchVisCodes {
  'Hidden',
  'Visible',
  'Admin Only',
}
