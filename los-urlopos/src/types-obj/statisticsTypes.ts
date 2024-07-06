export type LeaveRequestStatusStats = {
  pendingRequest: number;
  approvedRequest: number;
  rejectedRequest: number;
  cancelledRequest: number;
};

export type LeaveRequestTypeStats = {
  annualLeave: number;
  additionalLeave: number;
  specialLeave: number;
  sickLeave: number;
  childLeave: number;
  unpaidLeave: number;
  onDemandLeave: number;
};

export type LeaveRequestStats = {
  statusStats: LeaveRequestStatusStats;
  typeStats: LeaveRequestTypeStats;
};

export type UserStatistics = {
  leaveRequestsStat: LeaveRequestStats;
  allRequests: number;
  totalDaysOff: number;
};

export type SupervisorStatistics = {
  leaveRequestsStat: LeaveRequestStats;
  allRequests: number;
  totalDaysOff: number;
  expiriedRequests: number;
  totalEmployees: number;
  employeesOnLeave: number;
};
