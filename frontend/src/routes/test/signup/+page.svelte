<script>
  import { signupWithEmail } from '$lib/api/auth.js';
  import { loginWithGoogle } from '$lib/api/firebase.js';
  let email = '';
  let password = '';
  let name = '';
  let message = '';
  let loading = false;
  let googleLoading = false;

  async function handleSignup() {
    message = '';
    if (!email || !password || !name) {
      message = 'Please enter name, email and password.';
      return;
    }
    loading = true;
    try {
      const result = await signupWithEmail({ email, password, name });
      message = 'Signup successful!';
      // Optionally, store token or redirect here
    } catch (err) {
      message = err.message || 'Signup failed.';
    } finally {
      loading = false;
    }
  }

  async function handleGoogleSignup() {
    message = '';
    googleLoading = true;
    try {
      const result = await loginWithGoogle(true);
      message = `Google signup successful! Welcome, ${result.backendUser.name || result.firebaseUser.displayName}`;
      // Optionally, store backendUser info or redirect here
    } catch (err) {
      message = err.message || 'Google signup failed.';
    } finally {
      googleLoading = false;
    }
  }
</script>

<main>
  <h1>Sign Up</h1>
  <form on:submit|preventDefault={handleSignup}>
    <label>
      Name:
      <input type="text" bind:value={name} required />
    </label>
    <br />
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
    <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
  </form>
  <button on:click={handleGoogleSignup} disabled={googleLoading} style="margin-top:1em;">
    {googleLoading ? 'Signing up with Google...' : 'Sign Up with Google'}
  </button>
  {#if message}
    <p>{message}</p>
  {/if}
</main>
