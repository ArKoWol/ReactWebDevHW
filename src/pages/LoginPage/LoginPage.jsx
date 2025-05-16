import './LoginPage.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button.jsx';
import { auth } from '../../firebase/firebaseApp';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

async function loginUser(email, password, navigate) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		console.log('Log in success:', userCredential.user.email);
		alert(`Welcome, ${userCredential.user.email}`);
		navigate('/');
	}
	catch (err) {
		console.error('Log in Error:', err.message);
		alert(`Log in Error: ${err.message}`);
	}
}

async function logoutUser(navigate) {
	try {
		await signOut(auth);
		console.log('Log out success');
		alert('You have been logged out');
		navigate('/');
	}
	catch (err) {
		console.error('Log out Error:', err.message);
		alert(`Log out Error: ${err.message}`);
	}
}

export function LoginPage({ currentUser }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(email, password, navigate);
	};

	const handleLogout = () => {
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
								type="text"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
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
