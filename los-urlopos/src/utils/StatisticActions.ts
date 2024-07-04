import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import { getDepartmentByHeadId } from "../services/DepartmentService";
import {
  getRequestDeptId,
  getRequestUserId,
} from "../services/LeaveRequestService";
import {
  LeaveRequestStats
} from "../types-obj/statisticsTypes";
import { Request } from "../types-obj/types-obj";


const sumDaysForRequestType = (requests: Request[], requestType: TYPE_OF_LEAVE) => {
  return requests.filter(x => x.status === requestType).reduce((totalDays, req) => totalDays + req.daysReq,
  0);
}

export async function getReqStatisticForUser(userId: string) {

  const requestList: Request[] = await getRequestUserId(userId);

  return {
    statusStats:{
      allRequest: requestList.length,
      pendingRequest: requestList.filter(x => x.status === REQUEST_STATUS.Pending).length,
      approvedRequest: requestList.filter(x => x.status === REQUEST_STATUS.Approved).length,
      rejectedRequest: requestList.filter(x => x.status === REQUEST_STATUS.Rejected).length,
      cancelledRequest: requestList.filter(x => x.status === REQUEST_STATUS.Cancelled).length,
    },
    typeStats: {
      totalLeave: requestList.reduce(
        (totalDays, req) => totalDays + req.daysReq,
        0
      ),
      annualLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.AnnualLeave),
      additionalLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.AdditionalLeave),
      specialLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.SpecialLeave),
      sickLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.SickLeave),
      childLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.ChildLeave),
      unpaidLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.UnpaidLeave),
      onDemandLeave: sumDaysForRequestType(requestList, TYPE_OF_LEAVE.OnDemandLeave),
    } 
  } as LeaveRequestStats;
}

export async function getReqStatisticForSupervisor(userId: string) {
  const departmentList: any[] = await getDepartmentByHeadId(userId);
  let requestListForEachDepartment: any[] = [];
  let i: number = 0;
  let j: number = 0;
  const now = new Date().getTime();

  for (i = 0; i < departmentList.length; i++) {
    const requestListByDepartment: any[] = await getRequestDeptId(
      departmentList[i].deptId
    );
    requestListForEachDepartment.push(requestListByDepartment);
  }

  let listOfRequestForSupervisor: any[] = [];

  let allReqNumberAll: number = 0;
  let pendingReqNumberAll: number = 0;
  let approvedReqNumberAll: number = 0;
  let rejectedReqNumberAll: number = 0;
  let cancelledReqNumberAll: number = 0;
  let annualLeaveNumberAll: number = 0;
  let additionalLeaveNumberAll: number = 0;
  let specialLeaveNumberAll: number = 0;
  let childLeaveNumberAll: number = 0;
  let unpaidLeaveNumberAll: number = 0;
  let onDemandLeaveNumberAll: number = 0;
  let pastTheExpirationAll: number = 0;
  let pastTheExpirationAllTab: any[] = [];

  for (i = 0; i < requestListForEachDepartment.length; i++) {
    let deptId: any;
    let allReqNumber: number = 0;
    let pendingReqNumber: number = 0;
    let approvedReqNumber: number = 0;
    let rejectedReqNumber: number = 0;
    let cancelledReqNumber: number = 0;
    let annualLeaveNumber: number = 0;
    let additionalLeaveNumber: number = 0;
    let specialLeaveNumber: number = 0;
    let childLeaveNumber: number = 0;
    let unpaidLeaveNumber: number = 0;
    let onDemandLeaveNumber: number = 0;
    let pastTheExpiration: number = 0;
    let pastTheExpirationTab: any[] = [];

    for (j = 0; j < requestListForEachDepartment[i].length; j++) {
      deptId = requestListForEachDepartment[i][j].deptId;

      let firsDayOfLeave = new Date(
        requestListForEachDepartment[i][j].dayFrom
      ).getTime();

      if (firsDayOfLeave < now) {
        pastTheExpirationAll++;
        pastTheExpiration++;
        pastTheExpirationAllTab.push(requestListForEachDepartment[i][j]);
        pastTheExpirationTab.push(requestListForEachDepartment[i][j]);
      }

      allReqNumber++;
      allReqNumberAll++;
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Pending
      ) {
        pendingReqNumber++;
        pendingReqNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Approved
      ) {
        approvedReqNumber++;
        approvedReqNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Rejected
      ) {
        rejectedReqNumber++;
        rejectedReqNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Cancelled
      ) {
        cancelledReqNumber++;
        cancelledReqNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.AnnualLeave
      ) {
        annualLeaveNumber++;
        annualLeaveNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.AdditionalLeave
      ) {
        additionalLeaveNumber++;
        additionalLeaveNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.SpecialLeave
      ) {
        specialLeaveNumber++;
        specialLeaveNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.ChildLeave
      ) {
        childLeaveNumber++;
        childLeaveNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.UnpaidLeave
      ) {
        unpaidLeaveNumber++;
        unpaidLeaveNumberAll++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.OnDemandLeave
      ) {
        onDemandLeaveNumber++;
        onDemandLeaveNumberAll++;
      }
    }
    const supervisorReqStatusAndTypeStatisticByDept = {
      deptartment: deptId,
      allRequest: allReqNumber,
      pastTheExpiration: pastTheExpiration,
      pastTheExpirationList: pastTheExpirationTab,
      request_pending: pendingReqNumber,
      request_approved: approvedReqNumber,
      request_rejected: rejectedReqNumber,
      request_cancelled: cancelledReqNumber,
      leave_annual: annualLeaveNumber,
      leave_additional: additionalLeaveNumber,
      leave_special: specialLeaveNumber,
      leave_child: childLeaveNumber,
      leave_unpaid: unpaidLeaveNumber,
      leave_onDemand: onDemandLeaveNumber,
    };
    listOfRequestForSupervisor.push(supervisorReqStatusAndTypeStatisticByDept);
  }
  const supervisorReqStatusAndTypeStatisticAll = {
    pastTheExpiration: pastTheExpirationAll,
    pastTheExpirationList: pastTheExpirationAllTab,
    allRequest: allReqNumberAll,
    deptartment: "",
    request_pending: pendingReqNumberAll,
    request_approved: approvedReqNumberAll,
    request_rejected: rejectedReqNumberAll,
    request_cancelled: cancelledReqNumberAll,
    leave_annual: annualLeaveNumberAll,
    leave_additional: additionalLeaveNumberAll,
    leave_special: specialLeaveNumberAll,
    leave_child: childLeaveNumberAll,
    leave_unpaid: unpaidLeaveNumberAll,
    leave_onDemand: onDemandLeaveNumberAll,
  };
  listOfRequestForSupervisor.splice(
    0,
    0,
    supervisorReqStatusAndTypeStatisticAll
  );
  return listOfRequestForSupervisor;
}
