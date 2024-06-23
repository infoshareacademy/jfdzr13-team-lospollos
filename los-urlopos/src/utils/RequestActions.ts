import { updateRequestAfterAction } from "../services/LeaveRequestService";
import { getUserById } from "../services/UserService";
import { updateUser } from "../services/UserService";
import REQUEST_STATUS from "../enums/requestStatus";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";

export async function cancelRequest(reqToUpdateAfterCancel: any) {
  const reqId = reqToUpdateAfterCancel.reqId;
  const userId = reqToUpdateAfterCancel.userId;
  const reqType = reqToUpdateAfterCancel.requestType;

  let reqDaysNumber: number = 0;
  let userToUpdateAfterCancel: any;
  let newCurrentDaysToUpdate: number = 0;
  let newOnDemandDaysToUpdate: number = 0;

  if (reqType === TYPE_OF_LEAVE.AnnualLeave) {
    reqDaysNumber = reqToUpdateAfterCancel.daysReq;
    userToUpdateAfterCancel = await getUserById(userId);
    newCurrentDaysToUpdate =
      userToUpdateAfterCancel.currentDays + reqDaysNumber;
    userToUpdateAfterCancel.currentDays = newCurrentDaysToUpdate;
    reqToUpdateAfterCancel.status = REQUEST_STATUS.Cancelled;
    updateRequestAfterAction(reqId, reqToUpdateAfterCancel);
    updateUser(userId, userToUpdateAfterCancel);
  } else if (reqType === TYPE_OF_LEAVE.OnDemandLeave) {
    reqDaysNumber = reqToUpdateAfterCancel.daysReq;
    userToUpdateAfterCancel = await getUserById(userId);
    newCurrentDaysToUpdate =
      userToUpdateAfterCancel.currentDays + reqDaysNumber;
    userToUpdateAfterCancel.currentDays = newCurrentDaysToUpdate;
    newOnDemandDaysToUpdate = userToUpdateAfterCancel.onDemand + reqDaysNumber;
    userToUpdateAfterCancel.onDemand = newOnDemandDaysToUpdate;
    reqToUpdateAfterCancel.status = REQUEST_STATUS.Cancelled;
    updateRequestAfterAction(reqId, reqToUpdateAfterCancel);
    updateUser(userId, userToUpdateAfterCancel);
  } else {
    reqToUpdateAfterCancel.status = REQUEST_STATUS.Cancelled;
    updateRequestAfterAction(reqId, reqToUpdateAfterCancel);
  }
}
export async function rejectRequest(
  reqToUpdateAfterReject: any,
  reason: string
) {
  const reqId = reqToUpdateAfterReject.reqId;
  const userId = reqToUpdateAfterReject.userId;
  const reqType = reqToUpdateAfterReject.requestType;

  reqToUpdateAfterReject.rejectReason = reason;

  let reqDaysNumber: number = 0;
  let userToUpdateAfterReject: any;
  let newCurrentDaysToUpdate: number = 0;

  if (reqType === TYPE_OF_LEAVE.AnnualLeave) {
    reqDaysNumber = reqToUpdateAfterReject.daysReq;
    userToUpdateAfterReject = await getUserById(userId);
    newCurrentDaysToUpdate =
      userToUpdateAfterReject.currentDays + reqDaysNumber;
    userToUpdateAfterReject.currentDays = newCurrentDaysToUpdate;
    reqToUpdateAfterReject.status = REQUEST_STATUS.Rejected;
    updateRequestAfterAction(reqId, reqToUpdateAfterReject);
    updateUser(userId, userToUpdateAfterReject);
  } else {
    reqToUpdateAfterReject.status = REQUEST_STATUS.Rejected;
    updateRequestAfterAction(reqId, reqToUpdateAfterReject);
  }
}

export function acceptRequest(reqToUpdateAfterAccept: any) {
  const reqId = reqToUpdateAfterAccept.reqId;
  reqToUpdateAfterAccept.status = REQUEST_STATUS.Approved;
  updateRequestAfterAction(reqId, reqToUpdateAfterAccept);
}
