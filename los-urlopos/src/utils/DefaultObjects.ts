import {
  DepartmentView,
  LeaveRequestView,
  RelationalUserView,
  UserView,
} from "../types-obj/objectViewTypes";

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
    createdAt: 0
}
