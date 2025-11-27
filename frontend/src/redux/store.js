// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import applicationSlice from "./applicationSlice";

import authSlice from "./authSlice";
import jobSlice from "./jobsSlice";
import companySlice from "./companySlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist only auth slice (not jobs)
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
