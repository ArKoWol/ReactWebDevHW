import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, Category } from '../../types';

interface RawMenuItem {
	id: string;
	img: string;
	meal: string;
	price: number;
	instructions: string;
	category: string;
}

interface MenuState {
	menuData: MenuItem[];
	categories: Category[];
	loading: boolean;
	error: string | null;
}

const initialState: MenuState = {
	menuData: [],
	categories: [],
	loading: false,
	error: null,
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setMenuLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setMenuData: (state, action: PayloadAction<MenuItem[]>) => {
			state.menuData = action.payload;
		},
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		setMenuError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		processRawMenuData: (state, action: PayloadAction<RawMenuItem[]>) => {
			const rawMenuData = action.payload;
			
			
			const formatted: MenuItem[] = rawMenuData.map((item) => ({
				id: item.id,
				image: item.img,
				title: item.meal,
				price: item.price,
				description: item.instructions,
				category: item.category.toLowerCase(),
			}));
			state.menuData = formatted;

			
			const uniqueCategories = [
				...new Set(rawMenuData.map((item) => item.category.toLowerCase())),
			];
			const formattedCategories = uniqueCategories.map((category) => ({
				id: category.toLowerCase(),
				label: category.charAt(0).toUpperCase() + category.slice(1),
			}));
			state.categories = formattedCategories;
		},
	},
});

export const {
	setMenuLoading,
	setMenuData,
	setCategories,
	setMenuError,
	processRawMenuData,
} = menuSlice.actions;

export default menuSlice.reducer; 