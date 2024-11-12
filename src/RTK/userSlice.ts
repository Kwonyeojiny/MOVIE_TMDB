import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// UserState 인터페이스 정의
interface UserState {
  user: { name: string; email: string } | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태 설정 (localStorage에서 값 불러오기)
const savedUser = localStorage.getItem('user');
const initialState: UserState = {
  user: savedUser ? JSON.parse(savedUser) : null, // savedUser가 있으면 파싱하여 사용
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isLoading = false;
      state.user = action.payload;
      // 로그인 성공 시 user 정보를 localStorage에 저장
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: state => {
      state.user = null;
      // 로그아웃 시 localStorage에서 사용자 정보 제거
      localStorage.removeItem('user');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
