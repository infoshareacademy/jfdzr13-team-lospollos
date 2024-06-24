import {
  getPermisionToAddAnnualLeave,
  updatePermisionToAddAnnualLeave,
} from "../services/AddAnnualLeaveService";

import {
  getAllUsersForAddAnnualLeave,
  updateUser,
} from "../services/UserService";
import toast from "react-hot-toast";

export async function AddAnnualDaysLeave() {
  const currentYears = new Date().getFullYear();
  let yearForComparison: any = await getPermisionToAddAnnualLeave();
  let listUsersForUpdateAnnualDays: any;

  if (!(currentYears === yearForComparison[0].yearForComparison)) {
    let counter = yearForComparison[0].yearForComparison;
    listUsersForUpdateAnnualDays = await getAllUsersForAddAnnualLeave();

    let i: number = 0;
    let newDaysOfAnnualLeave: number = 0;

    for (i = 0; i < listUsersForUpdateAnnualDays.length; i++) {
      newDaysOfAnnualLeave =
        listUsersForUpdateAnnualDays[i].days +
        listUsersForUpdateAnnualDays[i].currentDays;
      listUsersForUpdateAnnualDays[i].currentDays = newDaysOfAnnualLeave;

      updateUser(
        listUsersForUpdateAnnualDays[i].userId,
        listUsersForUpdateAnnualDays[i]
      );
    }
    counter = counter + 1;
    yearForComparison[0].yearForComparison = counter;

    updatePermisionToAddAnnualLeave(
      yearForComparison[0].docId,
      yearForComparison[0]
    );
    toast.success("All active users are updated!");
  } else {
    toast.error("You can add this value only once per year!");
  }
}
