import { getRequestUserId } from "../services/LeaveRequestService";
import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";

export async function getReqStatisticForUser(userId: string) {
  const requestList: any[] = await getRequestUserId(userId);

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

  const reqStatistic = [userReqStatusStatistic, userReqTypeStatistic];
  return reqStatistic;
}
