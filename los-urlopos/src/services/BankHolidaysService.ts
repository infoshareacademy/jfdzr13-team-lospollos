import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getBankHolidays = async () => {
  const querySnapshot = await getDocs(collection(db, "DaysOff"));
  let bankHolidaysList: string[] = [];
  querySnapshot.forEach((doc) => {
    bankHolidaysList.push(doc.data().day);
  });
  return bankHolidaysList;
};

export const addBankHolidays = async (dayToAdd: string) => {
  addDoc(collection(db, "DaysOff"), {
    day: dayToAdd,
  });
};
