import {
  getRequestUserId,
  getRequestDeptId,
} from "../services/LeaveRequestService";
import { getDepartmentByHeadId } from "../services/DepartmentService";
import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import { User } from "../types-obj/types-obj";

export async function getReqStatisticForUser(user: User) {
  const requestList: any[] = await getRequestUserId(user.userId);

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

  let i: number = 0;

  for (i = 0; i < requestList.length; i++) {
    allReqNumber++;

    if (requestList[i].status === REQUEST_STATUS.Pending) {
      pendingReqNumber++;
    }
    if (requestList[i].status === REQUEST_STATUS.Approved) {
      approvedReqNumber++;
    }
    if (requestList[i].status === REQUEST_STATUS.Rejected) {
      rejectedReqNumber++;
    }
    if (requestList[i].status === REQUEST_STATUS.Cancelled) {
      cancelledReqNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.AnnualLeave) {
      annualLeaveNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.AdditionalLeave) {
      additionalLeaveNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.SpecialLeave) {
      specialLeaveNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.ChildLeave) {
      childLeaveNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.UnpaidLeave) {
      unpaidLeaveNumber++;
    }
    if (requestList[i].requestType === TYPE_OF_LEAVE.OnDemandLeave) {
      onDemandLeaveNumber++;
    }
  }
  const userReqStatusStatistic = {
    allRequest: allReqNumber,
    pendingRequest: pendingReqNumber,
    approvedRequest: approvedReqNumber,
    rejectedRequest: rejectedReqNumber,
    cancelledRequest: cancelledReqNumber,
  };
  const userReqTypeStatistic = {
    annualLeave: annualLeaveNumber,
    additionalLeave: additionalLeaveNumber,
    specialLeave: specialLeaveNumber,
    childLeave: childLeaveNumber,
    unpaidLeave: unpaidLeaveNumber,
    onDemandLeave: onDemandLeaveNumber,
  };

  const reqStatisticUser = [userReqStatusStatistic, userReqTypeStatistic];
  return reqStatisticUser;
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
