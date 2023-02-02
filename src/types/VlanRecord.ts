export interface VlanRecord {
  id: number;
  name: string;
  description: string;
  notes: string;
  department: DepartmentCodes;
  protected: number;
  visibility: VisibilityCodes;
}

export enum VisibilityCodes {
  'Hidden',
  'Visible',
}

export enum DepartmentCodes {
  'Integration',
  'Depot',
  'Asset Disposistion',
  'All',
}
