<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { loginWithEmail } from '$lib/api/auth.js';
  import { loginWithGoogle } from '$lib/api/firebase.js';
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
  <h1>Login</h1>
  <form on:submit|preventDefault={handleLogin}>
    <label>
      Email:
      <input type="email" bind:value={email} required />
    </label>
    <br />
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <br />
    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
  </form>
  <button on:click={handleGoogleLogin} disabled={googleLoading} style="margin-top:1em;">
    {googleLoading ? 'Logging in with Google...' : 'Login with Google'}
  </button>
  {#if message}
    <p>{message}</p>
  {/if}
</main>
