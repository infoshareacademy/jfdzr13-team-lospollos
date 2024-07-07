import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const getPermisionToAddAnnualLeave = async () => {
  const querySnapshot = await getDocs(
    collection(db, "AddAnnualLeavePermision")
  );
  let yearForCamparison: any = [];
  querySnapshot.forEach((doc) =>
    yearForCamparison.push({ docId: doc.id, ...doc.data() })
  );
  return yearForCamparison;
};

export const updatePermisionToAddAnnualLeave = async (
  docId: string,
  updatedValues: object
) => {
  await setDoc(doc(db, "AddAnnualLeavePermision", docId), updatedValues, {
    merge: true,
  });
};
