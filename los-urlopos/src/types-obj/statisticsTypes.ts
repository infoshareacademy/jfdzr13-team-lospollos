export type LeaveRequestStatusStats = {
  allRequest: number;
  pendingRequest: number;
  approvedRequest: number;
  rejectedRequest: number;
  cancelledRequest: number;
};

export type LeaveRequestTypeStats = {
  totalLeave: number;
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
};
