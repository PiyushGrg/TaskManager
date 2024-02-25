import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import loadersSlice from "./loadersSlice";

const store = configureStore({
    reducer:{
        users: usersSlice,
        loaders: loadersSlice,
    }
});

export default store;