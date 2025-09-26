// src/lib/api/auth.js

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
const API_URL = 'http://localhost:8000/v1'; // Adjust if your backend runs elsewhere

export async function loginWithEmail({ email, password }) {
	try {
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		const idToken = await user.getIdToken();
		// Send token to backend
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Login failed');
		}
		return data;
	} catch (error) {
		throw error;
	}
}

export async function signupWithEmail({
	email,
	password,
	name,
	dateOfBirth,
	skills,
	status,
	linkedin,
	github,
	experience
}) {
	try {
		const auth = getAuth();
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		// Optionally set display name'
		if (name) {
			await updateProfile(user, { displayName: name });
		}
		const idToken = await user.getIdToken();
		// Send all collected data to backend
		const response = await fetch(`${API_URL}/auth/signup`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${idToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				dateOfBirth,
				skills,
				status,
				linkedin,
				github,
				experience
			})
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.error || 'Signup failed');
		}
		return data;
	} catch (error) {
		throw error;
	}
}
