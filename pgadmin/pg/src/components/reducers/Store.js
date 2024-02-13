import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import Loading from "./loader/Loading";
import Notification from "./loader/Notification";
// import Host from "./loader/Host";
import Loader from "./loader/Loader";
import Host from "./loader/Host";
import Tables from "./loader/Tables";

export const store = configureStore({
    reducer: combineReducers({
        // LoadingReducer: LoadingSlice,
        LoadingReducer: Loader,
        NotificationReducer: Notification,
        HostReducer: Host,
        TablesReducer: Tables
    })
})