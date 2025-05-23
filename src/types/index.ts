export interface MenuItem {
	id: string;
	image: string;
	title: string;
	price: number;
	description: string;
	category: string;
}

export interface Category {
	id: string;
	label: string;
}

export interface User {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
}
