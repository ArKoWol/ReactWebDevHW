import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ProductModal.css';
import { Button } from '../Button/Button';
import { QuantityControls } from '../QuantityControls/QuantityControls';
import { MenuItem } from '../../types';

type ProductModalProps = {
	isOpen: boolean;
	onClose: () => void;
	product: MenuItem | null;
	onAddToCart: (quantity: number) => void;
};

export function ProductModal({ isOpen, onClose, product, onAddToCart }: ProductModalProps): React.JSX.Element | null {
	const [quantity, setQuantity] = useState<number>(1);
	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	const handleQuantityChange = (newQuantity: number): void => {
		setQuantity(newQuantity);
	};

	const handleAddToCart = (): void => {
		onAddToCart(quantity);
		onClose();
	};

	const toggleDescription = (): void => {
		setIsDescriptionExpanded(!isDescriptionExpanded);
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!isOpen || !product) return null;

	return createPortal(
		<div className="product-modal-backdrop" onClick={handleBackdropClick}>
			<div className="product-modal">
				<button className="modal-close-button" onClick={onClose} aria-label="Close modal">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>

				<div className="modal-content">
					{}
					<div className="modal-header">
						<h1 className="modal-title">{product.title}</h1>
						<span className="modal-price">$ {product.price} USD</span>
					</div>

					{}
					<div className="modal-top-section">
						<div className="modal-image-section">
							<div className="modal-image-container">
								<img src={product.image} alt={product.title} className="modal-image" />
								<div className="modal-image-glow"></div>
							</div>
						</div>

						<div className="modal-description">
							<h3>Description</h3>
							<div className={`description-content ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
								<p>{product.description}</p>
							</div>
							<button className="expand-button" onClick={toggleDescription}>
								{isDescriptionExpanded ? 'Show Less' : 'Show More'}
							</button>
						</div>
					</div>

					{}
					<div className="modal-nutrition">
						<h3>Additional Information</h3>
						<div className="nutrition-grid">
							<div className="nutrition-item">
								<span className="nutrition-label">Category</span>
								<span className="nutrition-value">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
							</div>
							<div className="nutrition-item">
								<span className="nutrition-label">Preparation</span>
								<span className="nutrition-value">Fresh daily</span>
							</div>
							<div className="nutrition-item">
								<span className="nutrition-label">Delivery</span>
								<span className="nutrition-value">Hot & Fast</span>
							</div>
							<div className="nutrition-item">
								<span className="nutrition-label">Quality</span>
								<span className="nutrition-value">Premium</span>
							</div>
						</div>
					</div>

					{}
					<div className="modal-actions">
						<div className="quantity-section">
							<label htmlFor="modal-quantity">Quantity:</label>
							<QuantityControls
								value={quantity}
								onChange={handleQuantityChange}
								size="large"
							/>
						</div>
						<Button onClick={handleAddToCart} className="modal-add-button">
							Add {quantity} to Cart - $ {(product.price * quantity).toFixed(2)} USD
						</Button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
} 