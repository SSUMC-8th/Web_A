import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// 1. 전역 상태 슬라이스 생성
const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: true,
  reducers: {
    login: () => true,
    logout: () => false,
    toggleIsLoggedIn: (state) => !state,
  },
});

// 2. 슬라이스에서 액션과 리듀서 추출
export const { login, logout, toggleIsLoggedIn } = isLoggedInSlice.actions;

// 3. 리듀서 등록
export const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice.reducer,
  },
});

// 4. 타입 추론. 사실상 고정 코드
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 5. 타입이 포함된 useSelector와 useDispatch 유틸
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
