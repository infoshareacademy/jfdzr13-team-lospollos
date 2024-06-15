import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export const getDepartment = async () => {
  const querySnapshot = await getDocs(collection(db, "Departments"));
  let deptList: any = [];
  querySnapshot.forEach((doc) =>
    deptList.push({ deptId: doc.id, ...doc.data() })
  );
  return deptList;
};
