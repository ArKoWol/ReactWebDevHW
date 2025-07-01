import React, { useEffect, useRef } from 'react';
import './CompanyPage.css';
import { DecorativeBackground } from '../../components/DecorativeBackground';
import { SectionDivider } from '../../components/SectionDivider';
import { stablePositions, createDecorativeElement } from '../../utils/decorativePositions';
import photo1 from '../../assets/photos/IMG_6866.JPG';
import photo2 from '../../assets/photos/IMG_4839.JPG';
import photo3 from '../../assets/photos/IMG_0440.jpg';

export function CompanyPage(): React.ReactElement {
	const heroRef = useRef<HTMLElement>(null);

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

	return (
		<div className="company-page">
			{}
			<DecorativeBackground density="heavy" variant="elegant" />
			
			<section className="hero-section" ref={heroRef}>
				{}
				{stablePositions.company.hero.map((element, index) => 
					createDecorativeElement(element, `company-hero-${index}`)
				)}
				
				<h1>Delivering Happiness, One Meal at a Time</h1>
				<p>We're not just a food delivery service - we're your partner in creating memorable dining experiences</p>
			</section>

			{}
			<SectionDivider variant="wave" height="medium" />

			<section className="mission-section fade-in-section">
				<div className="container">
					<h2>Our Mission</h2>
					<p>
						To revolutionize the food delivery experience by connecting people with the best local restaurants,
						ensuring quality, speed, and satisfaction in every order.
					</p>
				</div>
			</section>

			{}
			<SectionDivider variant="diagonal" height="small" />

			<section className="values-section fade-in-section">
				{}
				{stablePositions.company.values.map((element, index) => 
					createDecorativeElement(element, `company-values-${index}`)
				)}
				
				<div className="container">
					<h2>Our Values</h2>
					<div className="values-grid">
						<div className="value-card">
							<h3>🏆 Quality First</h3>
							<p>We partner only with the best restaurants to ensure exceptional food quality.</p>
						</div>
						<div className="value-card">
							<h3>❤️ Customer Focus</h3>
							<p>Your satisfaction is our top priority - we're here to serve you 24/7.</p>
						</div>
						<div className="value-card">
							<h3>🚀 Innovation</h3>
							<p>Constantly improving our service with cutting-edge technology.</p>
						</div>
						<div className="value-card">
							<h3>🌟 Community</h3>
							<p>Supporting local businesses and creating opportunities in our community.</p>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="curved" height="medium" />

			<section className="stats-section fade-in-section">
				<div className="container">
					<div className="stats-grid">
						<div className="stat-card">
							<h3>1M+</h3>
							<p>Happy Customers</p>
						</div>
						<div className="stat-card">
							<h3>500+</h3>
							<p>Restaurant Partners</p>
						</div>
						<div className="stat-card">
							<h3>50+</h3>
							<p>Cities Served</p>
						</div>
						<div className="stat-card">
							<h3>99%</h3>
							<p>Satisfaction Rate</p>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="wave" height="large" />

			<section className="team-section fade-in-section">
				{}
				{stablePositions.company.team.map((element, index) => 
					createDecorativeElement(element, `company-team-${index}`)
				)}
				
				<div className="container">
					<h2>Our Leadership Team</h2>
					<div className="team-grid">
						<div className="team-member">
							<div className="member-photo" style={{ backgroundImage: `url(${photo1})` }}></div>
							<h3>John Doe</h3>
							<p>Chief Executive Officer</p>
						</div>
						<div className="team-member">
							<div className="member-photo" style={{ backgroundImage: `url(${photo2})` }}></div>
							<h3>Anime Girl</h3>
							<p>Chief Operations Officer</p>
						</div>
						<div className="team-member">
							<div className="member-photo" style={{ backgroundImage: `url(${photo3})` }}></div>
							<h3>JSON Statham</h3>
							<p>Chief Technology Officer</p>
						</div>
					</div>
				</div>
			</section>

			{}
			<SectionDivider variant="diagonal" height="large" />

			<section className="contact-section fade-in-section">
				<div className="container">
					<h2>Get in Touch</h2>
					<div className="contact-info">
						<div className="contact-item">
							<h3>📍 Address</h3>
							<p>123 Food Street, Cuisine City, FC 12345</p>
						</div>
						<div className="contact-item">
							<h3>📧 Email</h3>
							<p>contact@fooddelivery.com</p>
						</div>
						<div className="contact-item">
							<h3>📞 Phone</h3>
							<p>+1 (555) 123-4567</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
