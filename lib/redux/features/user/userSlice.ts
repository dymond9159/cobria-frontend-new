import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

interface UserState {
  id: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, "isAuthenticated">>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.isAuthenticated = true
    },
    clearUser: (state) => {
      state.id = null
      state.name = null
      state.email = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated

export default userSlice.reducer
