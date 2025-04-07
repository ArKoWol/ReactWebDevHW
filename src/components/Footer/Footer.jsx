import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.svg';
import instagram from '../../assets/inst.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';

export function Footer() {
	return (
		<footer className="footer">
			<div className="info-container">
				<div className="logo-and-info">
					<img src={logo} alt=""/>
					<p>Takeaway & Delivery template</p>
					<p>for small - medium businesses.</p>
				</div>
				<div id='info'>
					<h1>COMPANY</h1>
					<p>Home</p>
					<p>Order</p>
					<p>FAQ</p>
					<p>Contact</p>
				</div>
				<div id='info'>
					<h1>TEMPLATE</h1>
					<p>Style Guide</p>
					<p>Changelog</p>
					<p>Licence</p>
					<p>Webflow University</p>
				</div>
				<div id='info'>
					<h1>FLOWBASE</h1>
					<p>More Cloneables</p>
				</div>
			</div>
			<hr/>
			<div className="links-and-info">
				<div className="footer-info">
					<p>Built by <span>Flowbase</span>· Powered by <span>Webflow</span></p>
				</div>
				<div className="social-links">
					<a href="https://www.instagram.com/"><img src={ instagram } alt="instagram"/></a>
					<a href="https://x.com/"><img src={ twitter } alt="twitter"/></a>
					<a href="https://www.youtube.com/"><img src={ youtube } alt="youtube"/></a>
				</div>
			</div>
		</footer>
	);
}
