import './LoginPage.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { auth } from '../../firebase/firebaseApp';
import {
	signInWithEmailAndPassword,
	signOut,
	User,
	AuthError,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
	currentUser: User | null;
}

async function loginUser(
	email: string,
	password: string,
	navigate: ReturnType<typeof useNavigate>,
): Promise<void> {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		console.log('Log in success:', userCredential.user.email);
		alert(`Welcome, ${userCredential.user.email}`);
		navigate('/');
	} catch (err) {
		const error = err as AuthError;
		let errorMessage: string;

		switch (error.code) {
			case 'auth/invalid-credential':
				errorMessage = 'Invalid email or password';
				break;
			case 'auth/user-not-found':
				errorMessage = 'No account found with this email';
				break;
			case 'auth/wrong-password':
				errorMessage = 'Incorrect password';
				break;
			case 'auth/invalid-email':
				errorMessage = 'Invalid email format';
				break;
			case 'auth/too-many-requests':
				errorMessage = 'Too many failed login attempts. Please try again later';
				break;
			default:
				errorMessage = error.message;
		}

		console.error('Log in Error:', errorMessage);
		alert(`Log in Error: ${errorMessage}`);
	}
}

async function logoutUser(
	navigate: ReturnType<typeof useNavigate>,
): Promise<void> {
	try {
		await signOut(auth);
		console.log('Log out success');
		alert('You have been logged out');
		navigate('/');
	} catch (err) {
		const error = err as AuthError;
		console.error('Log out Error:', error.message);
		alert(`Log out Error: ${error.message}`);
	}
}

export function LoginPage({ currentUser }: LoginPageProps): React.ReactElement {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		loginUser(email, password, navigate);
	};

	const handleLogout = (): void => {
		logoutUser(navigate);
	};

	if (currentUser) {
		return (
			<div className="LoginPage">
				<div className="triangle"></div>
				<div className="login-page-container">
					<h1>Account</h1>
					<div className="login-form">
						<div className="user-info">
							<p>You are logged in as:</p>
							<h3>{currentUser.email}</h3>
						</div>
						<div className="login-form-button-container">
							<Button type="button" onClick={handleLogout}>
								Log Out
							</Button>
							<Button type="button" onClick={() => navigate('/')}>
								Back to Home
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="LoginPage">
			<div className="triangle"></div>
			<div className="login-page-container">
				<h1>Log in</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="login-form-input-container">
						<p>User name</p>
						<div className="login-form-input">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
							/>
						</div>
					</div>
					<div className="login-form-input-container">
						<p>Password</p>
						<div className="login-form-input">
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								autoComplete="current-password"
							/>
						</div>
					</div>
					<div className="login-form-button-container">
						<Button type="submit">Submit</Button>
						<Button
							type="button"
							onClick={() => {
								setEmail('');
								setPassword('');
							}}
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
