import { getUserById } from "../services/UserService";
import {
  DepartmentView,
  LeaveRequestView,
  RelationalUserView,
  UserView,
} from "../types-obj/objectViewTypes";
import { Departments, Request, User } from "../types-obj/types-obj";
import { emptyDepartment } from "../utils/DefaultObjects";

export const toRelationalUserView = async (userId: string) => {
  const user = await getUserById(userId);

  return {
    id: user?.userId,
    name: `${user?.firstName ?? ""} ${user?.surname ?? ""}`,
  } as RelationalUserView;
};

export const toDepartmentView = async (department: Departments) =>
  ({
    id: department!.deptId,
    name: department!.dept,
    leader: await toRelationalUserView(department!.head),
  } as DepartmentView);

export const toDepartmentViewById = async (
  deopartmentList: Departments[],
  departmentId: string
) => {
  var departmentData = deopartmentList.find((d) => d.deptId === departmentId);

  if (!departmentData) {
    return emptyDepartment;
  }

  return await toDepartmentView(departmentData);
};

export const toDepartmentListView = async (departments: Departments[]) =>
  await Promise.all(departments.map(async (d) => await toDepartmentView(d)));

export const toLeaveRequestView = async (
  leaveRequest: Request,
  departments: Departments[]
) =>
  ({
    id: leaveRequest.id,
    status: leaveRequest.status,
    requestType: leaveRequest.requestType,
    dateFrom: leaveRequest.dayFrom,
    dateTo: leaveRequest.dayTo,
    daysOffRequested: leaveRequest.daysReq,
    daysOffLeft: leaveRequest.daysLeft,
    department: await toDepartmentViewById(departments, leaveRequest.deptId),
    comment: leaveRequest.comment,
    rejectReason: leaveRequest.rejectReason,
    createdBy: await toRelationalUserView(leaveRequest.userId),
    createdAt: leaveRequest.createdAt,
  } as LeaveRequestView);

export const toLeaveRequestListView = async (
  requestList: Request[],
  departmentList: Departments[]
) =>
  await Promise.all(
    requestList.map(async (lr) => await toLeaveRequestView(lr, departmentList))
  );

export const toUserView = async (user: User, departments: Departments[]) =>
  ({
    id: user.id!,
    firstName: user.firstName,
    lastName: user.surname,
    email: user.email,
    department: await toDepartmentViewById(departments, user.deptId),
    daysOffLeft: user.currentDays,
    daysOffTotal: user.days,
    onDemandLeft: user.onDemand,
    onDemandTotal: 4,
    roleAdmin: user.roleAdmin,
    roleUser: user.roleSupervisor,
    roleSupervisor: user.roleSupervisor,
    createdBy: await toRelationalUserView(user.createdBy),
    createdAt: user.createdAt,
    isActive: user.isActive,
  } as UserView);

export const toUserListView = async (
  userDataList: User[],
  departmentList: Departments[]
) =>
  await Promise.all(
    userDataList.map(async (u) => await toUserView(u, departmentList))
  );
