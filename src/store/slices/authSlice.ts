import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface AuthState {
	currentUser: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	currentUser: null,
	loading: true,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User | null>) => {
			state.currentUser = action.payload;
			state.loading = false;
		},
		setAuthLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setAuthError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.currentUser = null;
			state.error = null;
		},
	},
});

export const {
	setCurrentUser,
	setAuthLoading,
	setAuthError,
	logout,
} = authSlice.actions;

export default authSlice.reducer; 