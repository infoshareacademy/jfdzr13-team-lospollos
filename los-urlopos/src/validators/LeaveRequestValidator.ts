import toast from "react-hot-toast";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import { User } from "../types-obj/types-obj";

export function ValidateLeaveRequest(
  userForCheck: User,
  daysNumberForCheck: number,
  leaveTypeForCheck: string
) {
  console.log(daysNumberForCheck);
  console.log(userForCheck.currentDays);

  if (
    (leaveTypeForCheck === TYPE_OF_LEAVE.AnnualLeave ||
      leaveTypeForCheck === TYPE_OF_LEAVE.OnDemandLeave) &&
    daysNumberForCheck > userForCheck.currentDays
  ) {
    toast.error("You don't have enough vacation days");

    return false;
  }

  if (
    leaveTypeForCheck === TYPE_OF_LEAVE.OnDemandLeave &&
    daysNumberForCheck > userForCheck.onDemand
  ) {
    toast.error("You don't have enough On Demand days");

    return false;
  }

  toast.success("You request is waiting for approve");
  return true;
}
