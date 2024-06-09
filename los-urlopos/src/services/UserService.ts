import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "../types-obj/types-obj";

export const getUserById = async (id: string) => {
  const docRef = doc(db, "Users", id);
  let user = null;
  try {
    const fetchUserData = await getDoc(docRef);
    user = fetchUserData.data() as User;
  } catch (error) {
  } finally {
    return user;
  }
};
