import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import isLoggedInReducer from './isLoggedInSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    isLoggedIn: isLoggedInReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 비직렬화 체크 해제
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
