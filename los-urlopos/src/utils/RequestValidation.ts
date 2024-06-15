import toast from "react-hot-toast";
import { typeOfLeave } from "../components/TypeOfLeave/typeOfLeave";

export function requestValidation(
  userForCheck,
  daysNumberForCheck,
  leaveTypeForCheck
) {
  let answerForReuest = {
    pendingPermission: true,
    substractingDays: true,
    substractingOnDemandDays: true,
  };
  if (
    leaveTypeForCheck === typeOfLeave.AnnualLeave &&
    daysNumberForCheck > userForCheck.currentDays
  ) {
    toast.error("You don't have enough vacation days");
    answerForReuest = {
      pendingPermission: false,
      substractingDays: false,
      substractingOnDemandDays: false,
    };
    return answerForReuest;
  } else if (
    userForCheck.currentDays > userForCheck.onDemand &&
    daysNumberForCheck < userForCheck.currentDays &&
    leaveTypeForCheck === typeOfLeave.OnDemandLeave &&
    daysNumberForCheck > userForCheck.onDemand
  ) {
    toast.error("You don't have enough On Demand days");
    answerForReuest = {
      pendingPermission: false,
      substractingDays: false,
      substractingOnDemandDays: false,
    };
    return answerForReuest;
  } else if (
    leaveTypeForCheck === typeOfLeave.ChildLeave ||
    leaveTypeForCheck === typeOfLeave.SpecialLeave ||
    leaveTypeForCheck === typeOfLeave.AdditionalLeave ||
    leaveTypeForCheck === typeOfLeave.UnpaidLeave
  ) {
    toast.success("You request is waiting for approve");
    answerForReuest = {
      pendingPermission: true,
      substractingDays: false,
      substractingOnDemandDays: false,
    };
    return answerForReuest;
  } else if (leaveTypeForCheck === typeOfLeave.AnnualLeave) {
    toast.success("You request is waiting for approve");
    answerForReuest = {
      pendingPermission: true,
      substractingDays: true,
      substractingOnDemandDays: false,
    };
    return answerForReuest;
  } else {
    toast.success("You request is waiting for approve");
    answerForReuest = {
      pendingPermission: true,
      substractingDays: true,
      substractingOnDemandDays: true,
    };
    return answerForReuest;
  }
}
