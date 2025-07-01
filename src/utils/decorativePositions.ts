interface DecorativeElementConfig {
	type: 'circle' | 'square' | 'triangle' | 'hexagon' | 'diamond' | 'wave';
	size?: 'small' | '' | 'large';
	animation?: '' | 'floating-bounce' | 'floating-sway' | 'floating-drift' | 'floating-breathe';
	top?: string;
	left?: string;
	bottom?: string;
	right?: string;
	opacity?: string;
	animationDelay?: string;
}

export const stablePositions = {
	homepage: {
		hero: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '8%', left: '6%', animationDelay: '-2s' },
			{ type: 'diamond', animation: 'floating-bounce', top: '12%', right: '10%', animationDelay: '-4s' },
			{ type: 'wave', size: 'large', bottom: '18%', left: '3%', animationDelay: '-1s' },
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', bottom: '22%', right: '6%', animationDelay: '-3s' },
			{ type: 'circle', size: 'large', animation: 'floating-bounce', top: '58%', left: '83%', animationDelay: '-5s' },
			{ type: 'diamond', size: 'small', animation: 'floating-sway', top: '75%', right: '15%', animationDelay: '-6s' },
		],
		features: [
			{ type: 'diamond', size: 'small', animation: 'floating-sway', top: '8%', left: '2%', opacity: '0.06' },
			{ type: 'wave', animation: 'floating-bounce', bottom: '12%', right: '3%', opacity: '0.06' },
			{ type: 'wave', size: 'small', top: '50%', left: '1%', opacity: '0.05' },
			{ type: 'hexagon', size: 'small', bottom: '40%', right: '2%', opacity: '0.05' },
		],
		stats: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '3%', left: '8%', opacity: '0.04' },
			{ type: 'diamond', animation: 'floating-bounce', bottom: '8%', right: '12%', opacity: '0.04' },
			{ type: 'wave', size: 'large', top: '60%', left: '5%', opacity: '0.03' },
			{ type: 'hexagon', size: 'small', bottom: '50%', right: '6%', opacity: '0.04' },
		],
		cta: [
			{ type: 'circle', animation: 'floating-bounce', top: '15%', left: '6%', opacity: '0.05' },
			{ type: 'diamond', size: 'large', animation: 'floating-sway', bottom: '15%', right: '8%', opacity: '0.05' },
			{ type: 'wave', top: '60%', left: '3%', opacity: '0.04' },
			{ type: 'hexagon', size: 'large', bottom: '50%', right: '4%', opacity: '0.04' },
		],
	},
	menu: [
		{ type: 'circle', size: 'large', top: '5%', right: '5%', animationDelay: '-1s' },
		{ type: 'diamond', size: 'small', top: '15%', left: '8%', animationDelay: '-3s' },
		{ type: 'circle', bottom: '10%', right: '10%', animationDelay: '-2s' },
		{ type: 'wave', size: 'large', top: '40%', left: '3%', animationDelay: '-4s' },
		{ type: 'hexagon', size: 'small', animation: 'floating-bounce', bottom: '25%', left: '12%', animationDelay: '-1.5s' },
	],
	cart: {
		empty: [
			{ type: 'circle', size: 'large', animation: 'floating-sway', top: '10%', left: '10%', animationDelay: '-2s' },
			{ type: 'diamond', top: '20%', right: '15%', animationDelay: '-4s' },
			{ type: 'circle', size: 'small', bottom: '25%', left: '12%', animationDelay: '-1s' },
			{ type: 'wave', bottom: '15%', right: '18%', animationDelay: '-3s' },
		],
		filled: [
			{ type: 'hexagon', size: 'large', top: '8%', left: '5%', animationDelay: '-2s' },
			{ type: 'diamond', size: 'small', animation: 'floating-bounce', top: '20%', right: '8%', animationDelay: '-4s' },
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', bottom: '20%', left: '7%', animationDelay: '-1s' },
			{ type: 'wave', bottom: '12%', right: '12%', animationDelay: '-3s' },
			{ type: 'circle', size: 'small', top: '50%', left: '3%', animationDelay: '-5s' },
			{ type: 'triangle', size: 'large', top: '70%', right: '5%', animationDelay: '-2.5s' },
		],
	},
	login: {
		loggedIn: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '15%', left: '8%', animationDelay: '-2s' },
			{ type: 'diamond', size: 'small', top: '25%', right: '12%', animationDelay: '-4s' },
			{ type: 'wave', animation: 'floating-bounce', bottom: '20%', left: '6%', animationDelay: '-1s' },
			{ type: 'hexagon', bottom: '12%', right: '10%', animationDelay: '-3s' },
		],
		form: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '12%', left: '6%', animationDelay: '-2s' },
			{ type: 'diamond', animation: 'floating-bounce', top: '25%', right: '10%', animationDelay: '-4s' },
			{ type: 'circle', size: 'small', bottom: '18%', left: '5%', animationDelay: '-1s' },
			{ type: 'wave', size: 'large', bottom: '10%', right: '8%', animationDelay: '-3s' },
			{ type: 'circle', size: 'small', animation: 'floating-bounce', top: '55%', left: '3%', animationDelay: '-5s' },
			{ type: 'triangle', size: 'large', animation: 'floating-sway', top: '70%', right: '4%', animationDelay: '-6s' },
		],
	},
	signup: {
		loggedIn: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '20%', left: '10%', animationDelay: '-2s' },
			{ type: 'diamond', animation: 'floating-bounce', top: '30%', right: '15%', animationDelay: '-4s' },
			{ type: 'wave', size: 'large', bottom: '25%', left: '8%', animationDelay: '-1s' },
			{ type: 'hexagon', size: 'small', bottom: '15%', right: '12%', animationDelay: '-3s' },
		],
		form: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '18%', left: '8%', animationDelay: '-2s' },
			{ type: 'diamond', animation: 'floating-bounce', top: '28%', right: '12%', animationDelay: '-4s' },
			{ type: 'circle', size: 'large', bottom: '22%', left: '6%', animationDelay: '-1s' },
			{ type: 'wave', size: 'large', animation: 'floating-sway', bottom: '12%', right: '10%', animationDelay: '-3s' },
			{ type: 'circle', size: 'small', animation: 'floating-bounce', top: '60%', left: '4%', animationDelay: '-5s' },
			{ type: 'triangle', size: 'large', top: '75%', right: '5%', animationDelay: '-6s' },
		],
	},
	company: {
		hero: [
			{ type: 'hexagon', size: 'large', animation: 'floating-sway', top: '8%', left: '8%', animationDelay: '-1s' },
			{ type: 'diamond', top: '15%', right: '12%', animationDelay: '-3s' },
			{ type: 'wave', size: 'large', bottom: '25%', left: '15%', animationDelay: '-2s' },
			{ type: 'hexagon', size: 'small', animation: 'floating-bounce', bottom: '15%', right: '8%', animationDelay: '-4s' },
		],
		values: [
			{ type: 'diamond', size: 'small', top: '3%', left: '3%', opacity: '0.06', animationDelay: '-1s' },
			{ type: 'circle', top: '12%', right: '6%', opacity: '0.06', animationDelay: '-2s' },
			{ type: 'wave', size: 'small', animation: 'floating-sway', bottom: '8%', left: '10%', opacity: '0.06', animationDelay: '-3s' },
			{ type: 'hexagon', size: 'large', top: '60%', right: '3%', opacity: '0.05', animationDelay: '-4s' },
		],
		team: [
			{ type: 'wave', size: 'large', animation: 'floating-bounce', top: '5%', left: '2%', opacity: '0.04', animationDelay: '-1s' },
			{ type: 'diamond', bottom: '12%', right: '3%', opacity: '0.04', animationDelay: '-2s' },
			{ type: 'wave', size: 'large', top: '30%', left: '1%', opacity: '0.03', animationDelay: '-3s' },
			{ type: 'hexagon', size: 'small', animation: 'floating-sway', bottom: '40%', right: '2%', opacity: '0.04', animationDelay: '-4s' },
		],
	},
} as const;

import React from 'react';

export function createDecorativeElement(config: DecorativeElementConfig, key: string | number): React.ReactElement {
	const className = `floating-element floating-${config.type} ${config.size || ''} ${config.animation || ''}`.trim();
	
	const style: React.CSSProperties = {};
	if (config.top) style.top = config.top;
	if (config.left) style.left = config.left;
	if (config.bottom) style.bottom = config.bottom;
	if (config.right) style.right = config.right;
	if (config.opacity) style.opacity = config.opacity;
	if (config.animationDelay) style.animationDelay = config.animationDelay;

	return React.createElement('div', { key, className, style });
} 