import {
  DepartmentView,
  LeaveRequestView,
  RelationalUserView,
  UserView,
} from "../types-obj/objectViewTypes";
import {
  LeaveRequestStats,
  LeaveRequestStatusStats,
  LeaveRequestTypeStats,
  SupervisorStatistics,
  UserStatistics,
} from "../types-obj/statisticsTypes";

export const emptyRelationalUser: RelationalUserView = {
  id: "",
  name: "",
};

export const emptyDepartment: DepartmentView = {
  id: "",
  name: "",
  leader: emptyRelationalUser,
};

export const emptyUser: UserView = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  department: emptyDepartment,
  daysOffLeft: 0,
  daysOffTotal: 0,
  onDemandLeft: 0,
  onDemandTotal: 4,
  roleAdmin: false,
  roleUser: false,
  roleSupervisor: false,
  createdBy: emptyRelationalUser,
  createdAt: 0,
  isActive: false,
};

export const emptyLeaveRequest: LeaveRequestView = {
  id: "",
  status: "",
  requestType: "",
  dateFrom: "",
  dateTo: "",
  daysOffRequested: 0,
  daysOffLeft: 0,
  department: emptyDepartment,
  comment: "",
  rejectReason: "",
  createdBy: emptyRelationalUser,
  createdAt: 0,
};

export const emptyStatusStats: LeaveRequestStatusStats = {
  pendingRequest: 0,
  approvedRequest: 0,
  rejectedRequest: 0,
  cancelledRequest: 0,
};

export const emptyTypeStats: LeaveRequestTypeStats = {
  annualLeave: 0,
  additionalLeave: 0,
  specialLeave: 0,
  sickLeave: 0,
  childLeave: 0,
  unpaidLeave: 0,
  onDemandLeave: 0,
};

export const emptyLeaveRequestStats: LeaveRequestStats = {
  statusStats: emptyStatusStats,
  typeStats: emptyTypeStats,
};

export const emptyUserStatistics: UserStatistics = {
  leaveRequestsStat: emptyLeaveRequestStats,
  allRequests: 0,
  totalDaysOff: 0,
};

export const emptySupervisorStatistics: SupervisorStatistics = {
  leaveRequestsStat: emptyLeaveRequestStats,
  allRequests: 0,
  totalDaysOff: 0,
  expiriedRequests: 0,
  totalEmployees: 0,
  employeesOnLeave: 0,
};
