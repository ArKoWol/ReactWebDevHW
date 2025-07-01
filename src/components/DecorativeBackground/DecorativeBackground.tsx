import React, { useMemo } from 'react';
import './DecorativeBackground.css';

interface DecorativeBackgroundProps {
	density?: 'light' | 'medium' | 'heavy';
	variant?: 'default' | 'minimal' | 'elegant' | 'playful';
}

export function DecorativeBackground({ 
	density = 'medium', 
	variant = 'default' 
}: DecorativeBackgroundProps): React.ReactElement {
	
	const elements = useMemo(() => {
		const elements = [];
		let elementCount = 0;
		
		switch (density) {
			case 'light':
				elementCount = 8;
				break;
			case 'medium':
				elementCount = 15;
				break;
			case 'heavy':
				elementCount = 25;
				break;
		}

		const shapes = ['circle', 'square', 'triangle', 'hexagon', 'diamond', 'star', 'wave'];
		const sizes = ['small', '', 'large'];
		const animations = ['', 'floating-bounce', 'floating-sway'];

		for (let i = 0; i < elementCount; i++) {
			const shape = shapes[Math.floor(Math.random() * shapes.length)];
			const size = sizes[Math.floor(Math.random() * sizes.length)];
			const animation = animations[Math.floor(Math.random() * animations.length)];
			
			const style = {
				top: `${Math.random() * 100}%`,
				left: `${Math.random() * 100}%`,
				animationDelay: `${Math.random() * 10}s`,
				opacity: variant === 'minimal' ? 0.02 : 
						variant === 'elegant' ? 0.04 : 
						variant === 'playful' ? 0.08 : 0.06
			};

			elements.push(
				<div
					key={i}
					className={`floating-element floating-${shape} ${size} ${animation}`.trim()}
					style={style}
				/>
			);
		}

		return elements;
	}, [density, variant]); 

	return (
		<div className={`decorative-background decorative-background--${variant}`}>
			{elements}
		</div>
	);
} 