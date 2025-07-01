import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import './ErrorPage.css';

export function ErrorPage(): React.ReactElement {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/');
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="error-page">
			<div className="error-container">
				<div className="error-content">
					<div className="error-icon">
						<span className="error-number">404</span>
					</div>
					<h1 className="error-title">Страница не найдена</h1>
					<p className="error-description">
						К сожалению, страница, которую вы ищете, не существует или была перемещена.
					</p>
					<div className="error-actions">
						<Button onClick={handleGoHome} className="primary-button">
							На главную
						</Button>
						<Button onClick={handleGoBack} className="secondary-button">
							Назад
						</Button>
					</div>
				</div>
				<div className="error-illustration">
					<div className="not-found-graphic">
						<div className="graphic-circle"></div>
						<div className="graphic-line"></div>
						<div className="graphic-dot"></div>
					</div>
				</div>
			</div>
		</div>
	);
} 