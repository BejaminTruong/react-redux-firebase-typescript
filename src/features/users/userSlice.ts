import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getUserList, addNewUser, updateUser, deleteUser } from "./userActions";

export type UserType = {
  id?: string;
  name?: string;
};

export interface UserListState {
  collections: UserType[];
}

const initialState: UserListState = {
  collections: [],
};

export const fetchUserData = createAsyncThunk("user/fetchData", async () => {
  const result = (await getUserList()) as UserType[];
  console.log(result)
  return result;
});

export const addUser = createAsyncThunk("user/add", async (newUser: string) => {
  await addNewUser(newUser);
});

export const updateExistedUser = createAsyncThunk(
  "user/update",
  async (payload: UserType) => {
    updateUser(payload.id, payload.name);
  }
);

export const deleteExistedUser = createAsyncThunk(
  "user/delete",
  async (id: any) => {
    const result = await deleteUser(id);
    return result;
  }
);

export const userSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.collections = action.payload;
      })
  },
});


export const selectUser = (state: RootState) => state.user.collections;

export default userSlice.reducer;
