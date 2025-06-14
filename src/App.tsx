import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { CompanyPage } from './pages/CompanyPage/CompanyPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CartPage } from './pages/CartPage/CartPage';
import { Layout } from './components/Layout/Layout';
import { useFetch } from './hooks/useFetch';
import { auth } from './firebase/firebaseApp';
import { onAuthStateChanged, User } from 'firebase/auth';
import { MenuItem, Category } from './types';
import '@fontsource/inter';

function App(): React.JSX.Element {
	const [cartItemCount, setCartItemCount] = useState<number>(0);
	const [menuData, setMenuData] = useState<MenuItem[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const { data: rawMenuData } = useFetch<MenuItem[]>(
		'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals',
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!rawMenuData) return;

		const formatted = rawMenuData.map((item) => ({
			...item,
			image: item.img,
			title: item.meal,
			description: item.instructions,
			category: item.category.toLowerCase(),
		}));
		setMenuData(formatted);

		const uniqueCategories = [
			...new Set(rawMenuData.map((item) => item.category.toLowerCase())),
		];
		const formattedCategories = uniqueCategories.map((category) => ({
			id: category.toLowerCase(),
			label: category.charAt(0).toUpperCase() + category.slice(1),
		}));
		setCategories(formattedCategories);
	}, [rawMenuData]);

	const addToCart = (quantity: number): void => {
		setCartItemCount((prevCount) => prevCount + quantity);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout cartItemCount={cartItemCount} currentUser={currentUser} />
				}
			>
				<Route index element={<HomePage />} />
				<Route
					path="menu"
					element={
						<MenuPage
							onAddToCart={addToCart}
							menuData={menuData}
							categories={categories}
						/>
					}
				/>
				<Route path="company" element={<CompanyPage />} />
				<Route path="login" element={<LoginPage currentUser={currentUser} />} />
				<Route path="cart" element={<CartPage />} />
			</Route>
		</Routes>
	);
}

export default App;
