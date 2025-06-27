import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import createWebStorage from "redux-persist/lib/storage/createWebStorage"

// Import your reducers here
import counterReducer from "./features/counter/counterSlice"
import userReducer from "./features/user/userSlice"

// Create a custom storage for Next.js
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist user state
}

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // This is needed for redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
})

// Update the initializeStore function to use dynamic imports instead of require

export function initializeStore() {
  // This function will be called in a useEffect in a client component
  if (typeof window !== "undefined") {
    // Use dynamic import instead of require
    import("redux-persist").then(({ persistStore }) => {
      persistStore(store)
    })
  }
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
