import './MenuCard.css';
import { Button } from '../Button/Button.jsx';

export function MenuCard({ image, title, price, description }) {
	return (
		<div className="menuCard">
			<div className='menu-img'>
				<img src={image} alt=""/>
			</div>
			<div className="menu-content">
				<div className='card-name-and-price'>
					<h1 className='menu-card-title'>{title}</h1>
					<h1 className='menu-card-prise'>{price}</h1>
				</div>
				<div className='card-info'>
					<p>{description}</p>
				</div>
				<div>
					<Button>
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
