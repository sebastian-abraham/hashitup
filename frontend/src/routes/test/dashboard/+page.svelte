<script>
  import { auth } from '$lib/api/firebase.js';
  import { getAuth, signOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  let message = '';

  async function handleLogout() {
    try {
        await signOut(auth);
      goto('/test/login');
    } catch (err) {
        console.error('Logout error:', err);
      message = 'Logout failed.';
    }
  }
</script>

<main>
  <h1>Dashboard</h1>
  <button on:click={handleLogout}>Logout</button>
  {#if message}
    <p>{message}</p>
  {/if}
  <!-- ...existing dashboard content... -->
</main>
