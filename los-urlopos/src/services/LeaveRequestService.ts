import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Request } from "../types-obj/types-obj";

export const addNewLeaveRequest = async (request: Request) => {
  await addDoc(collection(db, "Requests"), request);
};

export const getRequestAll = async () => {
  const querySnapshot = await getDocs(collection(db, "Requests"));
  let requestListAll: any = [];
  querySnapshot.forEach((doc) =>
    requestListAll.push({ reqId: doc.id, ...doc.data() })
  );
  return requestListAll;
};

export const getRequestUserId = async (userId: String) => {
  const q = query(collection(db, "Requests"), where("userId", "==", userId));
  let requestListUser: any = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    requestListUser.push({ reqId: doc.id, ...doc.data() })
  );
  return requestListUser;
};

export const getRequestDeptId = async (deptId: String) => {
  const q = query(collection(db, "Requests"), where("deptId", "==", deptId));
  let requestListDept: any = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    requestListDept.push({ reqId: doc.id, ...doc.data() })
  );
  return requestListDept;
};

export const getRequestsByDeptIds = async (deptIds: string[]) => {
  var allRequests: Request[] = [];

  for (var deptId of deptIds) {
    var requestsForDept = await getRequestDeptId(deptId);
    allRequests = allRequests.concat(requestsForDept);
  }

  return allRequests;
};

export const updateRequestAfterAction = async (
  docId: string,
  updatedValues: object
) => {
  await setDoc(doc(db, "Requests", docId), updatedValues, {
    merge: true,
  });
};
