import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { Logo } from '../Logo';
import instagram from '../../assets/inst.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import { footerSections } from '../../data/footerConfObj';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../context/ThemeContext';

export function Footer(): React.ReactElement {
	const { theme } = useTheme();
	const logoColor = theme === Theme.LIGHT ? '#35b8be' : '#7aa2f7';

	return (
		<footer className="footer">
			<div className="info-container">
				<div className="logo-and-info">
					<Link to="/">
						<Logo color={logoColor} width={42} height={52} />
					</Link>
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
										href="https://example.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										{link}
									</a>
								) : (
									<Link 
										to={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`}
										onClick={(e) => {
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
						Built by <span className="accent-span">Flowbase</span>· Powered by <span className="accent-span">Webflow</span>
					</p>
				</div>
				<div className="social-links">
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
						<img src={instagram} alt="instagram" />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
						<img src={twitter} alt="twitter" />
					</a>
					<a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
						<img src={youtube} alt="youtube" />
					</a>
				</div>
			</div>
		</footer>
	);
}
