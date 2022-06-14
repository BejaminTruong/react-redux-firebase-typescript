// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebase.config";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addUser,
  updateExistedUser,
  deleteExistedUser,
  fetchUserData,
  selectUser,
} from "./userSlice";
// type Users = {
//   id: string;
//   name: string;
// };
const Users = () => {
  //   const [userList, setUserList] = useState<Users[] | []>([]);
  const [newUser, setNewUser] = useState<string>("");
  const [updatedUser, setUpdatedUser] = useState<string>("");
  const collections = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchUserData());
      console.log(res.payload);
    };
    fetchData();
  }, [dispatch]);

  //   useEffect(() => {
  //     let unsubcribe;
  //     const fetchData = async () => {
  //       unsubcribe = onSnapshot(collection(db, "Users"), (querySnapshot) =>
  //         setUserList(
  //           querySnapshot.docs.map((doc) => ({
  //             name: doc.data().name,
  //             id: doc.id,
  //           }))
  //         )
  //       );
  //     };
  //     fetchData();
  //     return unsubcribe;
  //   }, []);

  const handleAdd = async () => {
    try {
      await dispatch(addUser(newUser));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: any) => {
    await dispatch(updateExistedUser({ id, name: updatedUser }));
  };

  const handleDelete = async (id: any) => {
    await dispatch(deleteExistedUser(id));
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" onChange={(e) => setNewUser(e.target.value)} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div>
        {collections.map((user, index) => (
          <div
            key={index}
            style={{
              width: "400px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "10px" }}>Name: {user.name}</span>
            <div>
              <input
                style={{ maxWidth: "100px" }}
                onChange={(e) => setUpdatedUser(e.target.value)}
              />
              <button type="button" onClick={() => handleUpdate(user.id)}>
                Update
              </button>
              <button type="button" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
