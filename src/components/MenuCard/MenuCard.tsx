import './MenuCard.css';
import { Button } from '../Button/Button';
import { ProductModal } from '../ProductModal/ProductModal';
import React, { useState, ChangeEvent } from 'react';
import { MenuItem } from '../../types';

type MenuCardProps = MenuItem & {
	onAddToCart: (quantity: number) => void;
};

export function MenuCard({
	id,
	image,
	title,
	price,
	description,
	category,
	onAddToCart,
}: MenuCardProps): React.JSX.Element {
	const [quantity, setQuantity] = useState<string>('1');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const productData: MenuItem = {
		id,
		image,
		title,
		price,
		description,
		category,
	};

	const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;
		
		if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
			
			if (!isNaN(parseInt(value)) && parseInt(value) > 99) {
				setQuantity('99');
			} else {
				setQuantity(value);
			}
		}
	};

	const handleQuantityBlur = (): void => {
		
		if (quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
			setQuantity('1');
		} else if (parseInt(quantity) > 99) {
			setQuantity('99');
		}
	};

	const handleDecreaseQuantity = (e: React.MouseEvent): void => {
		e.stopPropagation();
		const currentQuantity = parseInt(quantity) || 0;
		if (currentQuantity > 1) {
			setQuantity((currentQuantity - 1).toString());
		}
	};

	const handleIncreaseQuantity = (e: React.MouseEvent): void => {
		e.stopPropagation();
		const currentQuantity = parseInt(quantity) || 0;
		if (currentQuantity < 99) {
			setQuantity((currentQuantity + 1).toString());
		}
	};

	const handleAddToCart = (e?: React.MouseEvent): void => {
		e?.stopPropagation(); 
		
		if (onAddToCart) {
			
			let finalQuantity = quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1 
				? 1 
				: parseInt(quantity);
			
			
			finalQuantity = Math.min(finalQuantity, 99);
			
			
			if (quantity === '' || isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
				setQuantity('1');
			} else if (parseInt(quantity) > 99) {
				setQuantity('99');
			}
			
			onAddToCart(finalQuantity);
		}
	};

	const handleCardClick = (): void => {
		setIsModalOpen(true);
	};

	const handleCloseModal = (): void => {
		setIsModalOpen(false);
	};

	const handleModalAddToCart = (modalQuantity: number): void => {
		onAddToCart(modalQuantity);
	};

	return (
		<>
			<div className="menuCard" onClick={handleCardClick}>
				<div className="menu-img">
					<img src={image} alt={title} />
				</div>
				<div className="menu-content">
					<div className="card-name-and-price">
						<h1 className="menu-card-title">{title}</h1>
						<h1 className="menu-card-prise">$ {price} USD</h1>
					</div>
					<div className="card-info">
						<p>{description}</p>
					</div>
					<div className="menu-add-buttons" onClick={(e) => e.stopPropagation()}>
						<div className="quantity-controls">
							<button 
								className="quantity-button decrease" 
								onClick={handleDecreaseQuantity}
							>
								−
							</button>
							<input
								type="number"
								value={quantity}
								onChange={handleQuantityChange}
								onBlur={handleQuantityBlur}
								className="menu-quantity-input"
								min="1"
								max="99"
							/>
							<button 
								className="quantity-button increase" 
								onClick={handleIncreaseQuantity}
							>
								+
							</button>
						</div>
						<Button onClick={handleAddToCart}>Add to Cart</Button>
					</div>
				</div>
			</div>

			<ProductModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				product={productData}
				onAddToCart={handleModalAddToCart}
			/>
		</>
	);
}
