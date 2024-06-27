import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const getDepartment = async () => {
  const querySnapshot = await getDocs(collection(db, "Departments"));
  let deptList: any = [];
  querySnapshot.forEach((doc) =>
    deptList.push({ deptId: doc.id, ...doc.data() })
  );
  return deptList;
};

export const getDepartmentByHeadId = async (headId: String) => {
  const q = query(collection(db, "Departments"), where("head", "==", headId));
  let headIdListDept: any = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    headIdListDept.push({ deptId: doc.id, ...doc.data() })
  );
  return headIdListDept;
};
