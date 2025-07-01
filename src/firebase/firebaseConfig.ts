interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	region?: string;
}

const requiredEnvVars = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
	if (!value) {
		throw new Error(`Missing required Firebase config: ${key}`);
	}
});

export const firebaseConfig: FirebaseConfig = {
	apiKey: requiredEnvVars.apiKey,
	authDomain: requiredEnvVars.authDomain,
	projectId: requiredEnvVars.projectId,
	storageBucket: requiredEnvVars.storageBucket,
	messagingSenderId: requiredEnvVars.messagingSenderId,
	appId: requiredEnvVars.appId,
	region: 'europe-west3' 
};
