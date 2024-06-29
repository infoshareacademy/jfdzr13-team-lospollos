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

  for (i = 0; i < departmentList.length; i++) {
    const requestListByDepartment: any[] = await getRequestDeptId(
      departmentList[i].deptId
    );
    requestListForEachDepartment.push(requestListByDepartment);
  }

  let listOfRequestByDepartment: any[] = [];

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

    for (j = 0; j < requestListForEachDepartment[i].length; j++) {
      deptId = requestListForEachDepartment[i][j].deptId;

      allReqNumber++;
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Pending
      ) {
        pendingReqNumber++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Approved
      ) {
        approvedReqNumber++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Rejected
      ) {
        rejectedReqNumber++;
      }
      if (
        requestListForEachDepartment[i][j].status === REQUEST_STATUS.Cancelled
      ) {
        cancelledReqNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.AnnualLeave
      ) {
        annualLeaveNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.AdditionalLeave
      ) {
        additionalLeaveNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.SpecialLeave
      ) {
        specialLeaveNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.ChildLeave
      ) {
        childLeaveNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.UnpaidLeave
      ) {
        unpaidLeaveNumber++;
      }
      if (
        requestListForEachDepartment[i][j].requestType ===
        TYPE_OF_LEAVE.OnDemandLeave
      ) {
        onDemandLeaveNumber++;
      }
    }
    const supervisorReqStatusAndTypeStatistic = {
      deptartment: deptId,
      allRequest: allReqNumber,
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
    listOfRequestByDepartment.push(supervisorReqStatusAndTypeStatistic);
  }

  return listOfRequestByDepartment;
}
