import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { User } from 'firebase/auth';

interface LayoutProps {
	cartItemCount: number;
	currentUser: User | null;
}

export function Layout({ cartItemCount }: LayoutProps): React.ReactElement {
	return (
		<div className="layout">
			<Navbar cartItemCount={cartItemCount} />
			<main className="main-content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
