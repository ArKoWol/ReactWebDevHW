import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../../types';
import { db } from '../../firebase/firebaseApp';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface CartItem extends MenuItem {
	quantity: number;
}

export interface Order {
	id: string;
	items: CartItem[];
	street: string;
	house: string;
	totalPrice: number;
	orderDate: string;
	status: 'pending' | 'confirmed' | 'delivered';
}

interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	orders: Order[];
}

const initialState: CartState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
	orders: [],
};

// Helper function to sync cart with Firestore
export async function syncCartWithFirestore(userId: string, cartItems: CartItem[]): Promise<void> {
	try {
		const userCartRef = doc(db, 'carts', userId);
		await setDoc(userCartRef, { items: cartItems }, { merge: true });
	} catch (error) {
		console.error('Error syncing cart with Firestore:', error);
	}
}

// Helper function to load cart from Firestore
export async function loadCartFromFirestore(userId: string): Promise<CartItem[]> {
	try {
		const userCartRef = doc(db, 'carts', userId);
		const cartDoc = await getDoc(userCartRef);
		if (cartDoc.exists()) {
			return cartDoc.data().items;
		}
		return [];
	} catch (error) {
		console.error('Error loading cart from Firestore:', error);
		return [];
	}
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<MenuItem>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			
			if (existingItem) {
				if (existingItem.quantity < 99) {
					existingItem.quantity += 1;
				}
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
			
			cartSlice.caseReducers.calculateTotals(state);
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload);
			cartSlice.caseReducers.calculateTotals(state);
		},
		updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
			const { id, quantity } = action.payload;
			const item = state.items.find(item => item.id === id);
			
			if (item) {
				if (quantity <= 0) {
					state.items = state.items.filter(item => item.id !== id);
				} else {
					item.quantity = Math.min(quantity, 99);
				}
			}
			
			cartSlice.caseReducers.calculateTotals(state);
		},
		clearCart: (state) => {
			state.items = [];
			state.totalItems = 0;
			state.totalPrice = 0;
		},
		calculateTotals: (state) => {
			state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
			state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
		},
		placeOrder: (state, action: PayloadAction<{ street: string; house: string }>) => {
			const { street, house } = action.payload;
			const order: Order = {
				id: Date.now().toString(),
				items: [...state.items],
				street,
				house,
				totalPrice: state.totalPrice,
				orderDate: new Date().toISOString(),
				status: 'pending',
			};
			
			state.orders.push(order);
			// Clear cart after placing order
			state.items = [];
			state.totalItems = 0;
			state.totalPrice = 0;
		},
		updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
			const { orderId, status } = action.payload;
			const order = state.orders.find(order => order.id === orderId);
			if (order) {
				order.status = status;
			}
		},
		// New reducer to set cart items from Firestore
		setCartItems: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload;
			cartSlice.caseReducers.calculateTotals(state);
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	updateQuantity,
	clearCart,
	calculateTotals,
	placeOrder,
	updateOrderStatus,
	setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer; 