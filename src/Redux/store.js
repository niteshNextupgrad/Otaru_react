// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import cartReducer from "./Slices/cartSlice";
import authReducer from "./Slices/authSlice";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["cart", "auth"], // persist only cart slice
};

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

export const persistor = persistStore(store);
