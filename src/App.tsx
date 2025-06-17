import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { CompanyPage } from './pages/CompanyPage/CompanyPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CartPage } from './pages/CartPage/CartPage';
import { Layout } from './components/Layout/Layout';
import { useFetch } from './hooks/useFetch';
import { auth } from './firebase/firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentUser } from './store/slices/authSlice';
import { processRawMenuData } from './store/slices/menuSlice';
import type { RootState } from './store';
import { MenuItem, Category, User } from './types';
import '@fontsource/inter';


interface RawMenuItem {
	id: string;
	img: string;
	meal: string;
	price: number;
	instructions: string;
	category: string;
}

function App(): React.JSX.Element {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector((state: RootState) => state.auth);
	const [cartItemCount, setCartItemCount] = useState<number>(0);

	const { data: rawMenuData } = useFetch<RawMenuItem[]>(
		'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals',
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			dispatch(setCurrentUser(user));
		});

		return () => unsubscribe();
	}, [dispatch]);

	useEffect(() => {
		if (!rawMenuData) return;
		dispatch(processRawMenuData(rawMenuData));
	}, [rawMenuData, dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			<Route
				path="/"
				element={<Layout />}
			>
				<Route index element={<HomePage />} />
				<Route path="menu" element={<MenuPage />} />
				<Route path="company" element={<CompanyPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="cart" element={<CartPage />} />
			</Route>
		</Routes>
	);
}

export default App;
