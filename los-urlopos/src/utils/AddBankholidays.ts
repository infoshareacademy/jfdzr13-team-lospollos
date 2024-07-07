import { toast } from "react-hot-toast";

import {
  addBankHolidays,
  getBankHolidays,
} from "../services/BankHolidaysService";

export async function addDayToBankHolidayList(dayToAdd: string) {
  const bankHolidaysList = await getBankHolidays();
  const existingDay = (e: string) => e === dayToAdd;

  !bankHolidaysList.some(existingDay)
    ? (addBankHolidays(dayToAdd), toast.success("Day is added!"))
    : toast.error("This day already exists in the calendar");
}
