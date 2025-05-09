import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { MenuPage } from './pages/MenuPage/MenuPage.jsx';
import { CompanyPage } from './pages/CompanyPage/CompanyPage.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { CartPage } from './pages/CartPage/CartPage.jsx';
import { Layout } from './components/Layout/Layout.jsx';
import { useFetch } from './hooks/useFetch';
import '@fontsource/inter';

function App() {
	const [cartItemCount, setCartItemCount] = useState(0);
	const [menuData, setMenuData] = useState([]);
	const [categories, setCategories] = useState([]);

	const { data: rawMenuData } = useFetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');

	useEffect(() => {
		if (!rawMenuData) return;

		const formatted = rawMenuData.map((item) => ({
			id: item.id,
			image: item.img,
			title: item.meal,
			price: item.price,
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


	const addToCart = (quantity) => {
		setCartItemCount((prevCount) => prevCount + quantity);
	};

	return (
		<Routes>
			<Route path="/" element={<Layout cartItemCount={cartItemCount} />}>
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
				<Route path="login" element={<LoginPage />} />
				<Route path="cart" element={<CartPage />} />
			</Route>
		</Routes>
	);
}

export default App;
