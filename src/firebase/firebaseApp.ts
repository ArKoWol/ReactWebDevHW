import { initializeApp, getApps } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { 
    getFirestore, 
    initializeFirestore, 
    persistentLocalCache,
    persistentSingleTabManager,
    type Firestore
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

let auth: Auth;
let db: Firestore;

try {
    
    const existingApps = getApps();
    let app;

    if (existingApps.length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = existingApps[0];
    }

    
    auth = getAuth(app);

    
    try {
        db = initializeFirestore(app, {
            localCache: persistentLocalCache({
                tabManager: persistentSingleTabManager(undefined)
            })
        });
    } catch (firestoreError) {
        console.warn('Failed to initialize Firestore with persistent cache, falling back to default:', firestoreError);
        db = getFirestore(app);
    }

    
    if (!auth) throw new Error('Firebase Auth failed to initialize');
    if (!db) throw new Error('Firestore failed to initialize');

} catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
}

export { auth, db };
