import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import homePageImage from '../../assets/homePageImage.png';
import trustpilot from '../../assets/trustpilot.svg';
import { Button } from '../../components/Button/Button';
import { DecorativeBackground } from '../../components/DecorativeBackground';
import { SectionDivider } from '../../components/SectionDivider';
import { stablePositions, createDecorativeElement } from '../../utils/decorativePositions';

export function HomePage(): React.ReactElement {
	const navigate = useNavigate();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		const animatedElements = document.querySelectorAll('.fade-in-section');
		animatedElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	const handlePlaceOrder = () => {
		navigate('/menu');
	};

	return (
		<div className="home-page">
			{}
			{/* <DecorativeBackground density="heavy" variant="playful" /> */}
			
			{}
			<section className="hero-section">
				{}
				{/* {stablePositions.homepage.hero.map((element, index) => 
					createDecorativeElement(element, `hero-${index}`)
				)} */}
				
				<div className="hero-container">
					<div className="hero-content fade-in-section">
						<h1 className="hero-title">
							Beautiful food & takeaway, <span className="accent-span">delivered</span> to your door.
						</h1>
						<p className="hero-subtitle">
							Experience culinary excellence with our premium food delivery service. 
							Fresh ingredients, expert preparation, and lightning-fast delivery.
						</p>
						<div className="hero-cta">
							<Button onClick={handlePlaceOrder} className="hero-button">
								Place an Order
							</Button>
						</div>
						<div className="rating-container">
							<img src={trustpilot} alt="Trustpilot logo" />
							<p>
								<span className="accent-span">4.8 out of 5</span> based on 2000+ reviews
							</p>
						</div>
					</div>
					
					<div className="hero-image-container fade-in-section">
						<div className="image-wrapper">
							<img src={homePageImage} alt="Delicious food" className="hero-image" />
							<div className="image-glow"></div>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="wave" height="medium" />

			{}
			<section className="features-section fade-in-section">
				{}
				{/* {stablePositions.homepage.features.map((element, index) => 
					createDecorativeElement(element, `features-${index}`)
				)} */}
				
				<div className="container">
					<h2 className="features-title">Why Choose Our Service?</h2>
					<div className="features-grid">
						<div className="feature-card interactive-card">
							<div className="feature-icon">🚀</div>
							<h3 className="feature-title">Lightning Fast</h3>
							<p className="feature-description">
								Get your favorite meals delivered in 30 minutes or less with our optimized delivery network.
							</p>
						</div>
						<div className="feature-card interactive-card">
							<div className="feature-icon">👨‍🍳</div>
							<h3 className="feature-title">Premium Quality</h3>
							<p className="feature-description">
								Partner restaurants selected for exceptional food quality and culinary expertise.
							</p>
						</div>
						<div className="feature-card interactive-card">
							<div className="feature-icon">📱</div>
							<h3 className="feature-title">Easy Ordering</h3>
							<p className="feature-description">
								Intuitive interface makes ordering your favorite meals simple and enjoyable.
							</p>
						</div>
						<div className="feature-card interactive-card">
							<div className="feature-icon">🎯</div>
							<h3 className="feature-title">Real-time Tracking</h3>
							<p className="feature-description">
								Track your order from kitchen to doorstep with live updates and notifications.
							</p>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="diagonal" height="small" />

			{}
			<section className="stats-section fade-in-section">
				{}
				{/* {stablePositions.homepage.stats.map((element, index) => 
					createDecorativeElement(element, `stats-${index}`)
				)} */}
				
				<div className="container">
					<div className="stats-grid">
						<div className="stat-card interactive-card">
							<h3 className="stat-number">100K+</h3>
							<p className="stat-label">Happy Customers</p>
						</div>
						<div className="stat-card interactive-card">
							<h3 className="stat-number">500+</h3>
							<p className="stat-label">Partner Restaurants</p>
						</div>
						<div className="stat-card interactive-card">
							<h3 className="stat-number">50+</h3>
							<p className="stat-label">Cities Served</p>
						</div>
						<div className="stat-card interactive-card">
							<h3 className="stat-number">25min</h3>
							<p className="stat-label">Average Delivery</p>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="curved" height="large" />

			{}
			<section className="cta-section fade-in-section">
				{}
				{/* {stablePositions.homepage.cta.map((element, index) => 
					createDecorativeElement(element, `cta-${index}`)
				)} */}
				
				<div className="container">
					<div className="cta-content">
						<h2 className="cta-title">Ready to Start Your Culinary Journey?</h2>
						<p className="cta-text">
							Join thousands of satisfied customers who trust us for their daily meals. 
							Order now and taste the difference!
						</p>
						<Button onClick={handlePlaceOrder} className="cta-button">
							Explore Our Menu
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
