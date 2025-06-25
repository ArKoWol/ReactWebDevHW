import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo.svg';
import instagram from '../../assets/inst.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import { footerSections } from '../../data/footerConfObj';

export function Footer(): React.ReactElement {
	return (
		<footer className="footer">
			<div className="info-container">
				<div className="logo-and-info">
					<img src={logo} alt="Logo" />
					<p>Takeaway & Delivery template</p>
					<p>for small - medium businesses.</p>
				</div>

				{footerSections.map((section, index) => (
					<div className="info" key={index}>
						<h1>{section.title}</h1>
						{section.links.map((link, linkIndex) => (
							<p key={linkIndex}>
								{section.title === 'TEMPLATE' ? (
									<a
										href="https://www.google.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										{link}
									</a>
								) : (
									<Link 
										to={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`}
										onClick={(e) => {
											// Prevent navigation for now as these pages don't exist yet
											e.preventDefault();
										}}
									>
										{link}
									</Link>
								)}
							</p>
						))}
					</div>
				))}
			</div>

			<hr />

			<div className="links-and-info">
				<div className="footer-info">
					<p>
						Built by <span>Flowbase</span>· Powered by <span>Webflow</span>
					</p>
				</div>
				<div className="social-links">
					<a href="https://www.instagram.com/">
						<img src={instagram} alt="instagram" />
					</a>
					<a href="https://x.com/">
						<img src={twitter} alt="twitter" />
					</a>
					<a href="https://www.youtube.com/">
						<img src={youtube} alt="youtube" />
					</a>
				</div>
			</div>
		</footer>
	);
}
