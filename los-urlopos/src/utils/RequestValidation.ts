import toast from "react-hot-toast";
import { typeOfLeave } from "../components/TypeOfLeave/typeOfLeave";
import { User } from "../types-obj/types-obj";

export function ValidateLeaveRequest(
  userForCheck: User,
  daysNumberForCheck: number,
  leaveTypeForCheck: string
) {
  if (
    leaveTypeForCheck === typeOfLeave.AnnualLeave &&
    daysNumberForCheck > userForCheck.currentDays
  ) {
    toast.error("You don't have enough vacation days");
    return false;
  } else if (
    userForCheck.currentDays > userForCheck.onDemand &&
    daysNumberForCheck < userForCheck.currentDays &&
    leaveTypeForCheck === typeOfLeave.OnDemandLeave &&
    daysNumberForCheck > userForCheck.onDemand
  ) {
    toast.error("You don't have enough On Demand days");

    return false;
  } else if (
    leaveTypeForCheck === typeOfLeave.ChildLeave ||
    leaveTypeForCheck === typeOfLeave.SpecialLeave ||
    leaveTypeForCheck === typeOfLeave.AdditionalLeave ||
    leaveTypeForCheck === typeOfLeave.UnpaidLeave
  ) {
    toast.success("You request is waiting for approve");

    return true;
  } else if (leaveTypeForCheck === typeOfLeave.AnnualLeave) {
    toast.success("You request is waiting for approve");

    return true;
  } else {
    toast.success("You request is waiting for approve");

    return true;
  }
}
