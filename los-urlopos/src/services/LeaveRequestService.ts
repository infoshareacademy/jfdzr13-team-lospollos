import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Request } from "../types-obj/types-obj";

export const addNewLeaveRequest = async (request: Request) => {
  await addDoc(collection(db, "Requests"), request);
};
