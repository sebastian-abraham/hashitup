// src/lib/api/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
	apiKey: 'AIzaSyBA1Q9Zf74bmAlhV_R2VQUrbjjtbrySi-o',
	authDomain: 'hashitup-1cff7.firebaseapp.com',
	projectId: 'hashitup-1cff7',
	storageBucket: 'hashitup-1cff7.firebasestorage.app',
	messagingSenderId: '1017371069401',
	appId: '1:1017371069401:web:1cf40ad118f9bc26f6a7c8',
	measurementId: 'G-KW1S9DQKEN'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function loginWithGoogle(isSignup = false) {
	try {
		const result = await signInWithPopup(auth, provider);
		const idToken = await result.user.getIdToken();
		// Send token to backend for DB check
		const endpoint = isSignup ? 'signup' : 'login';
		const response = await fetch(`http://localhost:8000/v1/auth/${endpoint}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || `Google ${isSignup ? 'signup' : 'login'} failed (backend)`);
		}
		// Return backend user info and Firebase user
		return { firebaseUser: result.user, backendUser: data };
	} catch (error) {
		throw error;
	}
}
