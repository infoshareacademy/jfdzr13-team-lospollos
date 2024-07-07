import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const getDepartmentByHeadId = async (headId: String) => {
  const q = query(collection(db, "Departments"), where("head", "==", headId));
  let headIdListDept: any = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    headIdListDept.push({ deptId: doc.id, ...doc.data() })
  );
  return headIdListDept;
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

export const getDepartmentsByUserId = async (headId: string) => {
  const q = query(collection(db, "Departments"), where("head", "==", headId));
  let deptList: Departments[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    deptList.push({
      deptId: doc.id,
      dept: doc.data().dept,
      head: doc.data().head,
    } as Departments)
  );
  return deptList;
};

export const subscribeToDepartments = (
  onUpdate: (departments: Departments[]) => void
) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "Departments"),
      (snapshot) => {
        const departments: Departments[] = [];
        snapshot.forEach((doc) =>
          departments.push({
            deptId: doc.id,
            dept: doc.data().dept,
            head: doc.data().head,
          })
        );
        onUpdate(departments);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error subscribing to departments: ", error);
  }
};

export const createDepartment = async (newDepartment: Departments) => {
  try {
    const docRef = await addDoc(collection(db, "Departments"), {
      dept: newDepartment.dept,
      head: newDepartment.head,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating department: ", error);
    throw new Error("Error creating department.");
  }
};

export const updateDepartment = async (
  departmentId: string,
  updatedDepartment: Departments
) => {
  try {
    const deptDocRef = doc(db, "Departments", departmentId);
    await updateDoc(deptDocRef, {
      dept: updatedDepartment.dept,
      head: updatedDepartment.head,
    });
  } catch (error) {
    console.error("Error updating department: ", error);
    throw new Error("Error updating department.");
  }
};

export const deleteDepartment = async (departmentId: string) => {
  try {
    const deptDocRef = doc(db, "Departments", departmentId);
    await deleteDoc(deptDocRef);
  } catch (error) {
    console.error("Error deleting department: ", error);
    throw new Error("Error deleting department.");
  }
};
