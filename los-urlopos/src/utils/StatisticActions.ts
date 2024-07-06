import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import { getDepartmentsByUserId } from "../services/DepartmentService";
import {
  getRequestDeptId,
  getRequestUserId,
  getRequestsByDeptIds,
} from "../services/LeaveRequestService";
import {
  getAllUsersByDeptIds,
  getUsersByDeptId,
} from "../services/UserService";
import {
  SupervisorStatistics,
  UserStatistics,
} from "../types-obj/statisticsTypes";
import { Request, User } from "../types-obj/types-obj";

export async function getReqStatisticForUser(userId: string) {
  const requestList: Request[] = await getRequestUserId(userId);

  return {
    leaveRequestsStat: {
      statusStats: {
        pendingRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Pending
        ).length,
        approvedRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Approved
        ).length,
        rejectedRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Rejected
        ).length,
        cancelledRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Cancelled
        ).length,
      },
      typeStats: {
        annualLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.AnnualLeave
        ).length,
        additionalLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.AdditionalLeave
        ).length,
        specialLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.SpecialLeave
        ).length,
        sickLeave: requestList.filter(
          (x) => x.status === TYPE_OF_LEAVE.SickLeave
        ).length,
        childLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.ChildLeave
        ).length,
        unpaidLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.UnpaidLeave
        ).length,
        onDemandLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.OnDemandLeave
        ).length,
      },
    },
    allRequests: requestList.length,
    totalDaysOff: requestList.reduce(
      (totalDays, req) => totalDays + req.daysReq,
      0
    ),
  } as UserStatistics;
}

export async function getReqStatisticForSupervisor(
  departmentId: string | null,
  userId: string
) {
  let requestList: Request[] = [];
  let employeeList: User[] = [];

  if (departmentId) {
    requestList = await getRequestDeptId(departmentId);
    employeeList = await getUsersByDeptId(departmentId);
  } else {
    const departmentsIds = (await getDepartmentsByUserId(userId)).map(
      (x) => x.deptId
    );
    requestList = await getRequestsByDeptIds(departmentsIds);
    employeeList = await getAllUsersByDeptIds(departmentsIds);
  }

  return {
    leaveRequestsStat: {
      statusStats: {
        pendingRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Pending
        ).length,
        approvedRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Approved
        ).length,
        rejectedRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Rejected
        ).length,
        cancelledRequest: requestList.filter(
          (x) => x.status === REQUEST_STATUS.Cancelled
        ).length,
      },
      typeStats: {
        annualLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.AnnualLeave
        ).length,
        additionalLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.AdditionalLeave
        ).length,
        specialLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.SpecialLeave
        ).length,
        sickLeave: requestList.filter(
          (x) => x.status === TYPE_OF_LEAVE.SickLeave
        ).length,
        childLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.ChildLeave
        ).length,
        unpaidLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.UnpaidLeave
        ).length,
        onDemandLeave: requestList.filter(
          (x) => x.requestType === TYPE_OF_LEAVE.OnDemandLeave
        ).length,
      },
    },
    allRequests: requestList.filter((x) => x.status === REQUEST_STATUS.Pending)
      .length,
    totalDaysOff: requestList.reduce(
      (totalDays, req) => totalDays + req.daysReq,
      0
    ),
    expiredRequests: requestList.filter(
      (x) =>
        Date.parse(x.dayFrom) <= Date.now() &&
        x.status === REQUEST_STATUS.Pending
    ).length,
    totalEmployees: employeeList.length,
    employeesOnLeave: requestList
      .map((x) => x.userId)
      .filter((value, index, self) => self.indexOf(value) === index).length,
  } as SupervisorStatistics;
}
