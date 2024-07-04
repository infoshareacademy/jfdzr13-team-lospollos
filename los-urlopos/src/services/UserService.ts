import {
  doc,
  getDoc,
  setDoc,
  where,
  query,
  collection,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "../types-obj/types-obj";

const usersCollection = collection(db, "Users");
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

export const updateUser = async (userId: string, updatedValues: object) => {
  await setDoc(doc(db, "Users", userId), updatedValues, { merge: true });
};

export const getAllUsersForAddAnnualLeave = async () => {
  const q = query(usersCollection, where("isActive", "==", true));
  let usersForAddAnnualLeave: any = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    usersForAddAnnualLeave.push({ ...doc.data() })
  );
  return usersForAddAnnualLeave;
};

export const deleteUser = async (id: string) => {
  await deleteDoc(doc(db, "Users", id));
};

export const subscribeToUsers = (
  onUpdate: (users: User[]) => void,
  onError: (error: string) => void
) => {
  const unsub = onSnapshot(
    usersCollection,
    (snapshot) => {
      const usersData: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as User),
      }));
      onUpdate(usersData);
    },
    (error) => {
      onError(error.message);
    }
  );
  return unsub;
};

export const addUser = async (uid: string, userData: any) => {
  await setDoc(doc(db, "Users", uid), userData);
};

export const fetchSupervisors = async (): Promise<User[]> => {
  try {
    const q = query(usersCollection, where("roleSupervisor", "==", true));
    const querySnapshot = await getDocs(q);

    const supervisors: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));

    return supervisors;
  } catch (error) {
    console.error("Error fetching supervisors: ", error);
    throw error;
    3;
  }
};
