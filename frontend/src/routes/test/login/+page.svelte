<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { loginWithEmail } from '$lib/api/auth.js';
	import { loginWithGoogle } from '$lib/api/firebase.js';
	import { form } from '$app/server';
	let email = '';
	let password = '';
	let message = '';
	let loading = false;
	let googleLoading = false;

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				goto('/test/dashboard');
			}
		});
	});

	async function handleLogin() {
		message = '';
		if (!email || !password) {
			message = 'Please enter email and password.';
			return;
		}
		loading = true;
		try {
			const result = await loginWithEmail({ email, password });
			message = 'Login successful!';
			// Optionally, store token or redirect here
		} catch (err) {
			message = err.message || 'Login failed.';
		} finally {
			loading = false;
		}
	}

	async function handleGoogleLogin() {
		message = '';
		googleLoading = true;
		try {
			const result = await loginWithGoogle(false);
			// result.backendUser is the user from your DB (created or found)
			message = `Google login successful! Welcome, ${result.backendUser.name || result.firebaseUser.displayName}`;
			// Optionally, store backendUser info or redirect here
		} catch (err) {
			message = err.message || 'Google login failed.';
		} finally {
			googleLoading = false;
		}
	}
</script>

<main>
	<form on:submit|preventDefault={handleLogin}>
		<div class="input-group-container">
			<label class="label">
				Email:
				<input type="email" class="input" bind:value={email} required />
			</label>
			<div class="password_container">
				<label class="label">
					Password:
					<input class="input" type="password" bind:value={password} required />
				</label>
			</div>

			<div class="button_container">
				<button type="submit" class="login-btn" disabled={loading}
					>{loading ? 'Logging in...' : 'Login'}</button
				>
				<button
					type="button"
					class="google-btn"
					on:click={handleGoogleLogin}
					disabled={googleLoading}
				>
					{googleLoading ? 'Logging in with Google...' : 'Login with Google'}
				</button>
				{#if message}
					<p>{message}</p>
				{/if}
			</div>
			<p class="new">New User?</p>
		</div>
	</form>
	<button type="button" class="signup-btn">Sign Up</button>
</main>

<style>
	.input-group-container {
		display: flex;
		position: absolute;
		top: 14%;
		left: -1%;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}
	.label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 1.5rem;
		font-weight: 600;
		color: #222;
		margin-top: 5rem;
		margin-bottom: 0.7rem;
		margin-right: 0;
		margin-left: 3rem;
		font-family: 'Roboto Condensed';
	}
	.input {
		background: #e0e0e0;
		position: relative;
		left: -2.8rem;
		border: 2px solid #111;
		border-radius: 0.5rem;
		padding: 0.8rem 1.5rem;
		font-size: 1.3rem;
		color: #111;
		margin-bottom: 1.2rem;
		outline: none;
		transition: border-color 0.2s;
		margin-left: 3rem;
		width: 320px;
		box-sizing: border-box;
	}
	.input:focus {
		border-color: #333;
	}
	.password_container {
		position: relative;
		top: -3rem;
	}

	.button_container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		right: 1.2rem;
		width: 70%;
		margin-top: -1.5rem;
		margin-left: 4rem;
		gap: 1rem;
	}
	.login-btn {
		width: 100%;
		padding: 0.9rem 0;
		font-size: 1.2rem;
		font-family: 'Roboto Condensed', sans-serif;
		background: #222;
		color: #fff;
		border: none;
		border-radius: 2.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}
	.login-btn:disabled {
		background: #888;
		cursor: not-allowed;
	}
	.google-btn {
		width: 100%;
		padding: 0.9rem 0;
		font-size: 1.2rem;
		font-family: 'Roboto Condensed', sans-serif;
		background: #fff;
		color: #222;
		border: 2px solid #000000;
		border-radius: 2.5rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.google-btn:disabled {
		background: #e0e0e0;
		color: #888;
		cursor: not-allowed;
	}
	.new {
		font-family: 'Roboto Condensed';
		font-size: 12px;
		position: relative;
		left: 11rem;
		margin-top: 15px;
	}
	.signup-btn {
		width: 70%;
		margin-left: 4rem;
		margin-top: 44.5rem;
		padding: 0.9rem 0;
		font-size: 1.2rem;
		font-family: 'Roboto Condensed', sans-serif;
		background: #222;
		color: #fff;
		border: none;
		border-radius: 2.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}
	.signup-btn:disabled {
		background: #888;
		cursor: not-allowed;
	}
</style>
