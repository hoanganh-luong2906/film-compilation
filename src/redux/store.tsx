import { configureStore } from '@reduxjs/toolkit';
import filmSlice from './filmSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    film: filmSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch