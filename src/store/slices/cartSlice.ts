import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../../types';

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

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<MenuItem>) => {
			const existingItem = state.items.find(item => item.id === action.payload.id);
			
			if (existingItem) {
				existingItem.quantity += 1;
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
					item.quantity = quantity;
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
} = cartSlice.actions;

export default cartSlice.reducer; 