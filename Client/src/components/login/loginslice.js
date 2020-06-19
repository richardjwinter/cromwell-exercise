import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    pending: false,
    errorMessage: "",
    user: "",
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.pending = false;
      state.user = action.payload;
    },
    pending: (state) => {
      state.errorMessage = "";
      state.user = "";
      state.pending = true;
    },
    error: (state, action) => {
      state.pending = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { login, pending, error } = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const loginHttp = (user) => (dispatch) => {
  dispatch(pending());
  axios.post("http://localhost:3100/user/login", user).then(
    (response) => {
      dispatch(login(response.data.username));
    },
    (err) => {
      dispatch(error(err.response.data));
    }
  );
};
export const selectPending = (state) => state.login.pending;
export const selectErrorMessage = (state) => state.login.errorMessage;
export const selectUser = (state) => state.login.user;

export default loginSlice.reducer;
