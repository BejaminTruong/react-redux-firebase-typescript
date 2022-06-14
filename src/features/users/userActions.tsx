import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { UserType } from "./userSlice";

export const getUserList = async () => {
  try {
    const data: UserType[] = [];
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) =>
      data.push({ name: doc.data().name, id: doc.id })
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addNewUser = async (newUser: string) => {
  try {
    await addDoc(collection(db, "Users"), { name: newUser });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: any, updatedUser: any) => {
  try {
    await updateDoc(doc(db, "Users", id), { name: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await deleteDoc(doc(db, "Users", id));
  } catch (error) {
    console.log(error);
  }
};
