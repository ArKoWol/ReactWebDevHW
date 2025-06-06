import './LoginPage.css';
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { auth } from '../../firebase/firebaseApp';
import {
	signInWithEmailAndPassword,
	signOut,
	AuthError,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface ValidationErrors {
	email?: string;
	password?: string;
	general?: string;
}

interface TouchedFields {
	email?: boolean;
	password?: boolean;
}

interface PasswordValidation {
	length: boolean;
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	isValid: boolean;
}

const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validatePassword = (password: string): PasswordValidation => {
	const minLength = 6;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumbers = /\d/.test(password);

	return {
		length: password.length >= minLength,
		uppercase: hasUpperCase,
		lowercase: hasLowerCase,
		numbers: hasNumbers,
		isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
	};
};

async function loginUser(
	email: string,
	password: string,
	navigate: ReturnType<typeof useNavigate>,
	setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>,
): Promise<void> {
	setErrors({});

	const emailValid = validateEmail(email);
	const passwordValid = validatePassword(password).isValid;

	if (!emailValid) {
		setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
		return;
	}

	if (!passwordValid) {
		setErrors(prev => ({ ...prev, password: 'Password does not meet requirements' }));
		return;
	}

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
		console.error('Log in Error:', error.message);
		let errorMessage = 'Login failed. Please try again.';
		if (error.code === 'auth/user-not-found') {
			errorMessage = 'No account found with this email address.';
		}
		else if (error.code === 'auth/wrong-password') {
			errorMessage = 'Incorrect password. Please try again.';
		}
		else if (error.code === 'auth/invalid-email') {
			errorMessage = 'Invalid email address format.';
		}
		else if (error.code === 'auth/user-disabled') {
			errorMessage = 'This account has been disabled.';
		}
		else if (error.code === 'auth/too-many-requests') {
			errorMessage = 'Too many failed attempts. Please try again later.';
		}

		setErrors({ general: errorMessage });
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

export function LoginPage(): React.ReactElement {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [touched, setTouched] = useState<TouchedFields>({});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const navigate = useNavigate();
	const { currentUser } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (touched.email && email) {
			if (!validateEmail(email)) {
				setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
			}
			else {
				setErrors(prev => {
					const { email: _email, ...rest } = prev;
					return rest;
				});
			}
		}
	}, [email, touched.email]);

	useEffect(() => {
		if (touched.password && password) {
			const passwordValidation = validatePassword(password);
			if (!passwordValidation.isValid) {
				const requirements: string[] = [];
				if (!passwordValidation.length) requirements.push('at least 6 characters');
				if (!passwordValidation.uppercase) requirements.push('one uppercase letter');
				if (!passwordValidation.lowercase) requirements.push('one lowercase letter');
				if (!passwordValidation.numbers) requirements.push('one number');

				setErrors(prev => ({
					...prev,
					password: `Password must contain ${requirements.join(', ')}`,
				}));
			}
			else {
				setErrors(prev => {
					const { password: _password, ...rest } = prev;
					return rest;
				});
			}
		}
	}, [password, touched.password]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setIsSubmitting(true);
		setTouched({ email: true, password: true });

		await loginUser(email, password, navigate, setErrors);
		setIsSubmitting(false);
	};

	const handleLogout = (): void => {
		logoutUser(navigate);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);

		if (errors.general) {
			setErrors(prev => {
				const { general: _general, ...rest } = prev;
				return rest;
			});
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value);
		if (errors.general) {
			setErrors(prev => {
				const { general: _general, ...rest } = prev;
				return rest;
			});
		}
	};

	const handleEmailBlur = (): void => {
		setTouched(prev => ({ ...prev, email: true }));
	};

	const handlePasswordBlur = (): void => {
		setTouched(prev => ({ ...prev, password: true }));
	};

	const isFormValid = (): boolean => {
		return validateEmail(email) && validatePassword(password).isValid && !isSubmitting;
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
					{errors.general && (
						<div className="error-message general-error">
							{errors.general}
						</div>
					)}

					<div className="login-form-input-container">
						<p>Email</p>
						<div className={`login-form-input ${errors.email ? 'error' : ''} ${touched.email && !errors.email && email ? 'valid' : ''}`}>
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={handleEmailChange}
								onBlur={handleEmailBlur}
								className={errors.email ? 'input-error' : ''}
								required
								autoComplete="email"
								aria-describedby={errors.email ? 'email-error' : undefined}
							/>
						</div>
						{errors.email && (
							<div id="email-error" className="error-message field-error">
								{errors.email}
							</div>
						)}
					</div>

					<div className="login-form-input-container">
						<p>Password</p>
						<div className={`login-form-input ${errors.password ? 'error' : ''} ${touched.password && !errors.password && password ? 'valid' : ''}`}>
							<input
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={handlePasswordChange}
								onBlur={handlePasswordBlur}
								className={errors.password ? 'input-error' : ''}
								required
								autoComplete="current-password"
								aria-describedby={errors.password ? 'password-error' : undefined}
							/>
						</div>
						{errors.password && (
							<div id="password-error" className="error-message field-error">
								{errors.password}
							</div>
						)}
						{touched.password && password && !errors.password && (
							<div className="password-requirements met">
								✓ Password meets all requirements
							</div>
						)}
						{touched.password && password && errors.password && (
							<div className="password-requirements">
								<p>Password requirements:</p>
								<ul>
									<li className={validatePassword(password).length ? 'met' : ''}>
										At least 6 characters
									</li>
									<li className={validatePassword(password).uppercase ? 'met' : ''}>
										One uppercase letter
									</li>
									<li className={validatePassword(password).lowercase ? 'met' : ''}>
										One lowercase letter
									</li>
									<li className={validatePassword(password).numbers ? 'met' : ''}>
										One number
									</li>
								</ul>
							</div>
						)}
					</div>

					<div className="login-form-button-container">
						<Button
							type="submit"
							disabled={!isFormValid()}
							className={isSubmitting ? 'loading' : ''}
						>
							{isSubmitting ? 'Signing In...' : 'Sign In'}
						</Button>
						<Button
							type="button"
							onClick={() => {
								setEmail('');
								setPassword('');
								setErrors({});
								setTouched({});
							}}
							disabled={isSubmitting}
							className="secondary"
						>
							Clear
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
