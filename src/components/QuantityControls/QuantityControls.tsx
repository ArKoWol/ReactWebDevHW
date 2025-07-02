import React, { useState, useEffect, ChangeEvent } from 'react';
import './QuantityControls.css';

interface QuantityControlsProps {
	value: number;
	min?: number;
	max?: number;
	onChange: (quantity: number) => void;
	className?: string;
	size?: 'small' | 'medium' | 'large';
}

export function QuantityControls({
	value,
	min = 1,
	max = 99,
	onChange,
	className = '',
	size = 'medium'
}: QuantityControlsProps): React.JSX.Element {
	const [inputValue, setInputValue] = useState<string>(value.toString());

	useEffect(() => {
		setInputValue(value > max ? `${max}+` : value.toString());
	}, [value, max]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const inputVal = event.target.value;
		
		if (inputVal === '' || (!isNaN(parseInt(inputVal)) && parseInt(inputVal) >= 0)) {
			if (!isNaN(parseInt(inputVal)) && parseInt(inputVal) > max) {
				setInputValue(max.toString());
				onChange(max);
			} else {
				setInputValue(inputVal);
				if (!isNaN(parseInt(inputVal)) && parseInt(inputVal) >= min) {
					onChange(parseInt(inputVal));
				}
			}
		}
	};

	const handleInputBlur = (): void => {
		if (inputValue === '' || isNaN(parseInt(inputValue)) || parseInt(inputValue) < min) {
			setInputValue(min.toString());
			onChange(min);
		} else if (parseInt(inputValue) > max) {
			setInputValue(max.toString());
			onChange(max);
		}
	};

	const handleDecrease = (e?: React.MouseEvent): void => {
		e?.stopPropagation();
		const currentQuantity = parseInt(inputValue) || min;
		if (currentQuantity > min) {
			const newQuantity = currentQuantity - 1;
			setInputValue(newQuantity.toString());
			onChange(newQuantity);
		}
	};

	const handleIncrease = (e?: React.MouseEvent): void => {
		e?.stopPropagation();
		const currentQuantity = parseInt(inputValue) || min;
		if (currentQuantity < max) {
			const newQuantity = currentQuantity + 1;
			setInputValue(newQuantity.toString());
			onChange(newQuantity);
		}
	};

	const sizeClass = `quantity-controls-${size}`;
	const combinedClassName = `quantity-controls ${sizeClass} ${className}`.trim();

	return (
		<div className={combinedClassName}>
			<button 
				className="quantity-button decrease" 
				onClick={handleDecrease}
				disabled={parseInt(inputValue) <= min}
				type="button"
			>
				−
			</button>
			<input
				type="number"
				value={inputValue === `${max}+` ? max.toString() : inputValue}
				onChange={handleInputChange}
				onBlur={handleInputBlur}
				onClick={(e) => e.stopPropagation()}
				className="quantity-input"
				min={min}
				max={max}
			/>
			<button 
				className="quantity-button increase" 
				onClick={handleIncrease}
				disabled={parseInt(inputValue) >= max}
				type="button"
			>
				+
			</button>
		</div>
	);
} 