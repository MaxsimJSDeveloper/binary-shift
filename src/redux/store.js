import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { waterReducer } from "./water/slice";
import { usersReducer } from "./users/slice";
import { waterRateReducer } from "./waterRate/slice";
import { todayReducer } from "./today/slice";
import { monthReducer } from "./month/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    water: waterReducer,
    waterRate: waterRateReducer,
    month: monthReducer,
    today: todayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
