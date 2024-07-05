import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import {
  getRequestAll,
  getRequestDeptId,
  getRequestUserId,
} from "../services/LeaveRequestService";
import { getAllUsers, getUsersByDeptId } from "../services/UserService";
import {
  SupervisorStatistics,
  UserStatistics,
} from "../types-obj/statisticsTypes";
import { Request, User } from "../types-obj/types-obj";

const sumDaysForRequestType = (
  requests: Request[],
  requestType: TYPE_OF_LEAVE
) => {
  return requests
    .filter((x) => x.status === requestType)
    .reduce((totalDays, req) => (totalDays += req.daysReq), 0);
};

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
  departmentId: string | null
) {
  const requestList: Request[] = departmentId
    ? await getRequestDeptId(departmentId)
    : await getRequestAll();
  const employeeList: User[] = departmentId
    ? await getUsersByDeptId(departmentId)
    : await getAllUsers();

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
    expiriedRequests: requestList.filter(
      (x) => Date.parse(x.dayFrom) <= Date.now()
    ).length,
    totalEmployees: employeeList.length,
    employeesOnLeave: requestList
      .map((x) => x.userId)
      .filter((value, index, self) => self.indexOf(value) === index).length,
  } as SupervisorStatistics;
}
