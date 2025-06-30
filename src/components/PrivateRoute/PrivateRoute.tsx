import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store';

interface PrivateRouteProps {
	children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps): React.ReactElement {
	const { currentUser, loading } = useAppSelector((state: RootState) => state.auth);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to="/login" replace />;
	}

	return children;
} 