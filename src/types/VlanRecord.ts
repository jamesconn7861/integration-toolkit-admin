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
  Visible = 1,
  Hidden = 2,
  Admin = 3,
}

export enum DepartmentCodes {
  Integration = 1,
  'Asset Disposistion' = 2,
  Depot = 3,
  Universal = 4,
}
