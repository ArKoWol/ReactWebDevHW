import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { MenuPage } from './pages/MenuPage/MenuPage.jsx';
import { CompanyPage } from './pages/CompanyPage/CompanyPage.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { CartPage } from './pages/CartPage/CartPage.jsx';
import { Layout } from './components/Layout/Layout.jsx';
import '@fontsource/inter';

function App() {
	const [cartItemCount, setCartItemCount] = useState(0);

	const addToCart = (quantity) => {
		setCartItemCount((prevCount) => prevCount + quantity);
	};

	return (
		<Routes>
			<Route path="/" element={<Layout cartItemCount={cartItemCount} />}>
				<Route index element={<HomePage />} />
				<Route path="menu" element={<MenuPage onAddToCart={addToCart} />} />
				<Route path="company" element={<CompanyPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="cart" element={<CartPage />} />
			</Route>
		</Routes>
	);
}

export default App;
