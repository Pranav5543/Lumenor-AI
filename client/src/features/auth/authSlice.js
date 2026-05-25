import { createSlice } from '@reduxjs/toolkit';

const persistedAuth = (() => {
  try {
    return JSON.parse(localStorage.getItem('noirthread_auth') || 'null');
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: persistedAuth?.user || null,
    accessToken: persistedAuth?.accessToken || null,
    hydrated: Boolean(persistedAuth)
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.hydrated = true;
      localStorage.setItem('noirthread_auth', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.hydrated = true;
      localStorage.removeItem('noirthread_auth');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
