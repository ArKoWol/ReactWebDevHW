import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['auth/setCurrentUser'],
				ignoredPaths: ['auth.currentUser'],
			},
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 