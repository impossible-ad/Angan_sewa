import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authState.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { indexSlice } from "./features/indexSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [indexSlice.reducerPath]: indexSlice.reducer, // to use slice for single case api: indexSlice.reducerpath
  },

  //to resolve serialized/unserialized value issue in frontend console(not)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(indexSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
