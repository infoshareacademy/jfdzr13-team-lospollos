import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Departments } from "../types-obj/types-obj";

export const getDepartment = async () => {
  const querySnapshot = await getDocs(collection(db, "Departments"));
  let deptList: Departments[] = [];
  querySnapshot.forEach((doc) =>
    deptList.push({
      deptId: doc.id,
      dept: doc.data().dept,
      head: doc.data().head,
    })
  );
  return deptList;
};

export const getDepartmentById = async (departmentId: string) => {
  const deptDocRef = doc(db, "Departments", departmentId);
  try {
    const fetchedDepartment = await getDoc(deptDocRef);

    return {
      deptId: fetchedDepartment.id,
      dept: fetchedDepartment.data()!.dept,
      head: fetchedDepartment.data()!.head,
    } as Departments;
  } catch (e) {
    console.error(e);

    return null;
  }
};
