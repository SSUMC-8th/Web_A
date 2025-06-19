import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './slice/cartSlice';
import isLoggedInReducer from './slice/isLoggedInSlice';
import modalReducer from './slice/modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    isLoggedIn: isLoggedInReducer,
    modal: modalReducer,
  },
  // modalSlice에서 onConfirm을 넘기기 위해
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 비직렬화 체크 해제
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
