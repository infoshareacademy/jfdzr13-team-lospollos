export type UserView = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: DepartmentView;
  daysOffLeft: number;
  daysOffTotal: number;
  onDemandLeft: number;
  onDemandTotal: number;
  roleAdmin: boolean;
  roleUser: boolean;
  roleSupervisor: boolean;
  createdBy: RelationalUserView;
  createdAt: number;
  isActive: boolean;
};

export type LeaveRequestView = {
  id: string;
  status: string;
  requestType: string;
  dateFrom: string;
  dateTo: string;
  daysOffRequested: number;
  daysOffLeft: number;
  department: DepartmentView;
  comment: string;
  rejectReason: string;
  createdBy: RelationalUserView;
  createdAt: number;
}

export type DepartmentView = {
  id: string;
  name: string;
  leader: RelationalUserView
};

export type RelationalUserView = {
  id: string;
  name: string;
}



