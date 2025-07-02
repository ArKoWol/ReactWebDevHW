import './MenuCard.css';
import { Button } from '../Button/Button';
import { ProductModal } from '../ProductModal/ProductModal';
import { QuantityControls } from '../QuantityControls/QuantityControls';
import React, { useState } from 'react';
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
	const [quantity, setQuantity] = useState<number>(1);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const productData: MenuItem = {
		id,
		image,
		title,
		price,
		description,
		category,
	};

	const handleQuantityChange = (newQuantity: number): void => {
		setQuantity(newQuantity);
	};

	const handleAddToCart = (e?: React.MouseEvent): void => {
		e?.stopPropagation(); 
		
		if (onAddToCart) {
			onAddToCart(quantity);
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
						<QuantityControls
							value={quantity}
							onChange={handleQuantityChange}
							size="medium"
						/>
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
