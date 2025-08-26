// src/Redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import cartReducer from "./Slices/cartSlice";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["cart"], // persist only cart slice
};

const rootReducer = combineReducers({
    cart: cartReducer,
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
