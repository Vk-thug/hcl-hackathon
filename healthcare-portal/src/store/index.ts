
import authReducer from "@/store/slices/authSlice";
import {
    type UnknownAction,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Fallback storage for environments where localStorage/sessionStorage is not available
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const localStorage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
const sessionStorage =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage: localStorage,
  blacklist: [],
};

const authPersistConfig = {
  key: "auth",
  storage: localStorage,
};


const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction
) => {
  if (action.type === "logout/pending") {
    // Clear both local and session storage for all keys
    Object.keys(state || {}).forEach((key) => {
      localStorage.removeItem(`persist:${key}`);
      sessionStorage.removeItem(`persist:${key}`);
    });
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding middleware to ignore persist actions
  // Reference: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
