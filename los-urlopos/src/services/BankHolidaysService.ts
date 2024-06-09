import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getBankHolidays = async () => {
  const querySnapshot = await getDocs(collection(db, "DaysOff"));
  let bankHolidaysList: string[] = [];
  querySnapshot.forEach((doc) => {
    bankHolidaysList.push(doc.data().day);
  });
  return bankHolidaysList;
};
