import toast from "react-hot-toast";
import TYPE_OF_LEAVE from "../enums/typeOfLeave";
import { User } from "../types-obj/types-obj";

export function ValidateLeaveRequest(
  userForCheck: User,
  daysNumberForCheck: number,
  leaveTypeForCheck: string
) {
  if (
    leaveTypeForCheck === TYPE_OF_LEAVE.AnnualLeave &&
    daysNumberForCheck > userForCheck.currentDays
  ) {
    toast.error("You don't have enough vacation days");
    return false;
  } else if (
    userForCheck.currentDays > userForCheck.onDemand &&
    daysNumberForCheck < userForCheck.currentDays &&
    leaveTypeForCheck === TYPE_OF_LEAVE.OnDemandLeave &&
    daysNumberForCheck > userForCheck.onDemand
  ) {
    toast.error("You don't have enough On Demand days");

    return false;
  } else if (
    leaveTypeForCheck === TYPE_OF_LEAVE.ChildLeave ||
    leaveTypeForCheck === TYPE_OF_LEAVE.SpecialLeave ||
    leaveTypeForCheck === TYPE_OF_LEAVE.AdditionalLeave ||
    leaveTypeForCheck === TYPE_OF_LEAVE.UnpaidLeave
  ) {
    toast.success("You request is waiting for approve");

    return true;
  } else if (leaveTypeForCheck === TYPE_OF_LEAVE.AnnualLeave) {
    toast.success("You request is waiting for approve");

    return true;
  } else {
    toast.success("You request is waiting for approve");

    return true;
  }
}
