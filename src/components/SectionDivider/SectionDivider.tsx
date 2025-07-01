import React from 'react';
import './SectionDivider.css';

interface SectionDividerProps {
	variant?: 'default' | 'wave' | 'diagonal' | 'curved';
	height?: 'small' | 'medium' | 'large';
	children?: React.ReactNode;
}

export function SectionDivider({ 
	variant = 'default', 
	height = 'medium',
	children 
}: SectionDividerProps): React.ReactElement {
	const getVariantClass = () => {
		switch (variant) {
			case 'wave':
				return 'section-divider--wave';
			case 'diagonal':
				return 'section-divider--diagonal';
			case 'curved':
				return 'section-divider--curved';
			default:
				return '';
		}
	};

	const getHeightClass = () => {
		switch (height) {
			case 'small':
				return 'section-divider--small';
			case 'large':
				return 'section-divider--large';
			default:
				return '';
		}
	};

	return (
		<div className={`section-divider ${getVariantClass()} ${getHeightClass()}`.trim()}>
			{children && (
				<div className="section-divider-content">
					{children}
				</div>
			)}
		</div>
	);
} 