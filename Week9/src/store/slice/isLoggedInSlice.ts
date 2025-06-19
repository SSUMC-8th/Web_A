import { createSlice } from '@reduxjs/toolkit';

const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: true,
  reducers: {
    login: () => true,
    logout: () => false,
    toggleIsLoggedIn: (state) => !state,
  },
});

export const { login, logout, toggleIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
