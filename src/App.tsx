import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { MenuPage } from './pages/MenuPage/MenuPage';
import { CompanyPage } from './pages/CompanyPage/CompanyPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/LoginPage/SignUpPage';
import { CartPage } from './pages/CartPage/CartPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Layout } from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { useFetch } from './hooks/useFetch';
import { auth } from './firebase/firebaseApp';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentUser } from './store/slices/authSlice';
import { processRawMenuData } from './store/slices/menuSlice';
import { loadCartFromFirestore, setCartItems, setCurrentUserId } from './store/slices/cartSlice';
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
	const { loading, user } = useAppSelector((state: RootState) => state.auth);
	const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const { data: rawMenuData } = useFetch<RawMenuItem[]>(
		'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals',
	);

	// Effect for handling auth state changes
	useEffect(() => {
		let isMounted = true;

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!isMounted) {
				return;
			}

			// Update auth state
			dispatch(setCurrentUser(user));
			
			// Set current user ID for cart sync
			setCurrentUserId(user?.uid || null);

			try {
				if (user) {
					const cartItems = await dispatch(loadCartFromFirestore(user.uid)).unwrap();
					if (isMounted) {
						dispatch(setCartItems(cartItems));
					}
				} else {
					dispatch(setCartItems([]));
				}
			} catch (error) {
				console.error('Error loading cart:', error);
				// Continue anyway, don't block app loading
				dispatch(setCartItems([]));
			}

			if (isMounted) {
				setFirebaseInitialized(true);
			}
		});

		// Fallback timeout to prevent infinite loading
		const fallbackTimeout = setTimeout(() => {
			if (isMounted && !firebaseInitialized) {
				console.warn('Firebase initialization timeout, proceeding without auth');
				dispatch(setCurrentUser(null));
				setCurrentUserId(null);
				setFirebaseInitialized(true);
			}
		}, 5000); // 5 second timeout

		return () => {
			isMounted = false;
			unsubscribe();
			clearTimeout(fallbackTimeout);
		};
	}, [dispatch, firebaseInitialized]);

	// Effect for processing menu data
	useEffect(() => {
		const processMenuData = async () => {
			if (!rawMenuData) return;
			dispatch(processRawMenuData(rawMenuData));
		};

		if (firebaseInitialized) {
			processMenuData();
		}
	}, [firebaseInitialized, dispatch, rawMenuData]);

	if (error) {
		return (
			<div style={{ padding: '20px', color: 'red' }}>
				<h3>Error</h3>
				<p>{error}</p>
				<button 
					onClick={() => setError(null)}
					style={{ padding: '8px 16px', marginTop: '10px' }}
				>
					Dismiss
				</button>
			</div>
		);
	}

	if (loading || !firebaseInitialized) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="menu" element={<MenuPage />} />
					<Route path="company" element={<CompanyPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignUpPage />} />
					<Route 
						path="cart" 
						element={
							<PrivateRoute>
								<CartPage />
							</PrivateRoute>
						} 
					/>
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
