import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/login/loginslice";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
