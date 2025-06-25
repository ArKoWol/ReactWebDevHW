import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
    getFirestore, 
    initializeFirestore, 
    persistentLocalCache,
    persistentSingleTabManager
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

let auth;
let db;

try {
    // Check if Firebase is already initialized
    const existingApps = getApps();
    let app;

    if (existingApps.length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = existingApps[0];
    }

    // Initialize Auth
    auth = getAuth(app);

    // Initialize Firestore with persistent cache
    try {
        db = initializeFirestore(app, {
            localCache: persistentLocalCache({
                tabManager: persistentSingleTabManager()
            })
        });
    } catch (firestoreError) {
        console.warn('Failed to initialize Firestore with persistent cache, falling back to default:', firestoreError);
        db = getFirestore(app);
    }

    // Verify initialization
    if (!auth) throw new Error('Firebase Auth failed to initialize');
    if (!db) throw new Error('Firestore failed to initialize');

} catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
}

export { auth, db };
