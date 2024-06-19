import { updateRequestAfterAction } from "../services/LeaveRequestService";
import { getUserById } from "../services/UserService";
import { updateUser } from "../services/UserService";
import REQUEST_STATUS from "../enums/requestStatus";

export async function cancelRequest(reqToUpdateAfterCancel: any) {
  const reqId = reqToUpdateAfterCancel.reqId;
  const userId = reqToUpdateAfterCancel.userId;
  let reqDaysNumber: number = reqToUpdateAfterCancel.daysReq;

  let userToUpdateAfterCancel: any = await getUserById(userId);

  let newCurrentDaysToUpdate =
    userToUpdateAfterCancel.currentDays + reqDaysNumber;

  userToUpdateAfterCancel.currentDays = newCurrentDaysToUpdate;

  reqToUpdateAfterCancel.status = REQUEST_STATUS.Cancelled;

  updateRequestAfterAction(reqId, reqToUpdateAfterCancel);
  updateUser(userId, userToUpdateAfterCancel);
}
