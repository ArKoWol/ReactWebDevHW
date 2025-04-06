import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { MenuPage } from './pages/MenuPage/MenuPage.jsx';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import '@fontsource/inter';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/home" replace />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/menu" element={<MenuPage />} />
			</Routes>
		</>
	);
}

export default App;
