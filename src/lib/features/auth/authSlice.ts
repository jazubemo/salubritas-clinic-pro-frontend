import { User } from '@/__generated__/graphql';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
