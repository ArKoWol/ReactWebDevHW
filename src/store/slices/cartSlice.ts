import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { MenuItem } from '../../types';
import { db } from '../../firebase/firebaseApp';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface CartItem extends MenuItem {
	quantity: number;
}

interface CartState {
	items: CartItem[];
	totalQuantity: number;
	totalAmount: number;
}

const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
	const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
	const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
	return { totalQuantity, totalAmount };
};

// Helper function to sync cart with current user
let currentUserId: string | null = null;

export const setCurrentUserId = (userId: string | null) => {
	currentUserId = userId;
};

// Helper function to sync cart after state changes
export const syncCartAfterChange = (cartItems: CartItem[]) => {
	return async (dispatch: any) => {
		if (currentUserId && cartItems.length >= 0) {
			try {
				await dispatch(syncCartWithFirestore({ userId: currentUserId, cartItems }));
			} catch (error) {
				console.error('Auto-sync failed:', error);
			}
		}
	};
};

// Async thunk to sync cart with Firestore
export const syncCartWithFirestore = createAsyncThunk(
	'cart/syncWithFirestore',
	async ({ userId, cartItems }: { userId: string; cartItems: CartItem[] }) => {
		try {
			if (!userId) {
				return;
			}

			const cartRef = doc(db, 'carts', userId);
			await setDoc(cartRef, {
				items: cartItems,
				updatedAt: new Date().toISOString()
			}, { merge: true });

		} catch (error) {
			console.error('Error syncing cart to Firestore:', error);
			throw error;
		}
	}
);

// Async thunk to load cart from Firestore
export const loadCartFromFirestore = createAsyncThunk(
	'cart/loadFromFirestore',
	async (userId: string): Promise<CartItem[]> => {
		try {
			const cartRef = doc(db, 'carts', userId);
			const cartDoc = await getDoc(cartRef);

			if (cartDoc.exists()) {
				const data = cartDoc.data();
				
				if (!data) {
					await setDoc(cartRef, { items: [], updatedAt: new Date().toISOString() });
					return [];
				}

				if (!data.items) {
					await setDoc(cartRef, { 
						items: [], 
						updatedAt: new Date().toISOString() 
					}, { merge: true });
					return [];
				}

				if (!Array.isArray(data.items)) {
					await setDoc(cartRef, { 
						items: [], 
						updatedAt: new Date().toISOString() 
					}, { merge: true });
					return [];
				}

				return data.items as CartItem[];
			} else {
				await setDoc(cartRef, { items: [], updatedAt: new Date().toISOString() });
				return [];
			}
		} catch (error) {
			console.error('Error loading cart from Firestore:', error);
			return [];
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<MenuItem>) => {
			const existingItem = state.items.find((item) => item.id === action.payload.id);

			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}

			const totals = calculateTotals(state.items);
			state.totalQuantity = totals.totalQuantity;
			state.totalAmount = totals.totalAmount;
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			
			const totals = calculateTotals(state.items);
			state.totalQuantity = totals.totalQuantity;
			state.totalAmount = totals.totalAmount;
		},

		updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity = action.payload.quantity;
			}

			const totals = calculateTotals(state.items);
			state.totalQuantity = totals.totalQuantity;
			state.totalAmount = totals.totalAmount;
		},

		clearCart: (state) => {
			state.items = [];
			state.totalQuantity = 0;
			state.totalAmount = 0;
		},

		// New reducer to set cart items from Firestore
		setCartItems: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload;
			const totals = calculateTotals(state.items);
			state.totalQuantity = totals.totalQuantity;
			state.totalAmount = totals.totalAmount;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCartFromFirestore.fulfilled, (state, action) => {
				state.items = action.payload;
				const totals = calculateTotals(state.items);
				state.totalQuantity = totals.totalQuantity;
				state.totalAmount = totals.totalAmount;
			})
			.addCase(loadCartFromFirestore.rejected, (state, action) => {
				console.error('Failed to load cart:', action.error);
				// Keep current state, don't clear it
			});
	},
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCartItems } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export default cartSlice.reducer; 