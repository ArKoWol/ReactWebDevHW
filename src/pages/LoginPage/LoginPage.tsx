import './LoginPage.css';
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { DecorativeBackground } from '../../components/DecorativeBackground';
import { stablePositions, createDecorativeElement } from '../../utils/decorativePositions';
import { auth } from '../../firebase/firebaseApp';
import {
	signInWithEmailAndPassword,
	signOut,
	AuthError,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentUser } from '../../store/slices/authSlice';

interface ValidationErrors {
	email?: string;
	password?: string;
	general?: string;
}

interface TouchedFields {
	email?: boolean;
	password?: boolean;
}

const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
	return password.length > 0;
};

async function loginUser(
	email: string,
	password: string,
	navigate: ReturnType<typeof useNavigate>,
	setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>,
	dispatch: ReturnType<typeof useAppDispatch>,
): Promise<void> {
	setErrors({});

	const emailValid = validateEmail(email);
	const passwordValid = validatePassword(password);

	if (!emailValid) {
		setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
		return;
	}

	if (!passwordValid) {
		setErrors(prev => ({ ...prev, password: 'Please enter your password' }));
		return;
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		dispatch(setCurrentUser(userCredential.user));
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
		else if (error.code === 'auth/invalid-credential') {
			errorMessage = 'Invalid email or password. Please check your credentials.';
		}

		setErrors({ general: errorMessage });
	}
}

const logoutUser = async (
	navigate: ReturnType<typeof useNavigate>,
): Promise<void> => {
	try {
		await signOut(auth);
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
	const dispatch = useAppDispatch();

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
			if (!validatePassword(password)) {
				setErrors(prev => ({ ...prev, password: 'Please enter your password' }));
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

		await loginUser(email, password, navigate, setErrors, dispatch);
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
		return validateEmail(email) && validatePassword(password) && !isSubmitting;
	};

	if (currentUser) {
		return (
			<div className="login-page">
				{}
				<DecorativeBackground density="light" variant="elegant" />
				
				{}
				{stablePositions.login.loggedIn.map((element, index) => 
					createDecorativeElement(element, `login-loggedin-${index}`)
				)}
				
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
		<div className="login-page">
			{}
			<DecorativeBackground density="medium" variant="default" />
			
			{}
			{stablePositions.login.form.map((element, index) => 
				createDecorativeElement(element, `login-form-${index}`)
			)}
			
			<div className="login-page-container">
				<h1>Log In</h1>
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
								name="email"
								autoComplete="username email"
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
								name="password"
								autoComplete="current-password"
								aria-describedby={errors.password ? 'password-error' : undefined}
							/>
						</div>
						{errors.password && (
							<div id="password-error" className="error-message field-error">
								{errors.password}
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

					<div style={{ textAlign: 'center', marginTop: '1rem' }}>
						<p style={{ color: 'var(--text-color)', margin: '0.5rem 0' }}>
							Don't have an account?{' '}
							<span
								className="accent-span"
								onClick={() => navigate('/signup')}
								style={{
									cursor: 'pointer',
									textDecoration: 'none',
									fontWeight: 500
								}}
							>
								Sign Up
							</span>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
