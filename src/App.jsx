import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { MenuPage } from './pages/MenuPage/MenuPage.jsx';
import { CompanyPage } from './pages/CompanyPage/CompanyPage.jsx';
import { LoginPage } from './pages/LoginPage/LoginPage.jsx';
import { CartPage } from './pages/CartPage/CartPage.jsx';
import { Layout } from './components/Layout/Layout.jsx';
import '@fontsource/inter';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItemCount: 0,
		};
		this.addToCart = this.addToCart.bind(this);
	}
	addToCart(quantity) {
		this.setState(prevState => ({
			cartItemCount: prevState.cartItemCount + quantity,
		}));
	}

	render() {
		return (
			<Routes>
				<Route
					path="/"
					element={
						<Layout
							cartItemCount={this.state.cartItemCount}
						/>
					}
				>
					<Route index element={<HomePage />} />
					<Route
						path="menu"
						element={<MenuPage onAddToCart={this.addToCart} />}
					/>
					<Route path="company" element={<CompanyPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="cart" element={<CartPage />} />
				</Route>
			</Routes>
		);
	}
}

export default App;