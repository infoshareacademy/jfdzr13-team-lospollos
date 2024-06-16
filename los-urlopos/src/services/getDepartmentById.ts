import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const getDepartmentById = async (deptId: string) => {
  console.log("Fetching department for ID:", deptId); // Debug log
  const deptDocRef = doc(db, "departments", deptId);
  const deptDoc = await getDoc(deptDocRef);
  if (deptDoc.exists()) {
    const data = deptDoc.data();
    console.log("Fetched department data:", data); // Debug log
    return data;
  } else {
    console.error("Department not found for ID:", deptId); // Debug log
    throw new Error("Department not found");
  }
};
