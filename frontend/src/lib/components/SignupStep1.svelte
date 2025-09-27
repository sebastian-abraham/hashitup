<script>
  export let data;
  export let googleSignup = false;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let email = data.email;
  let password = data.password;
  let name = data.name;

  function next() {
    dispatch('next', { email, password, name });
  }
</script>

<div>
  <h2>Step 1: Basic Info</h2>
  {#if !googleSignup}
    <label>Email: <input type="email" bind:value={email} required /></label><br />
    <label>Password: <input type="password" bind:value={password} required /></label><br />
    <label>Name: <input type="text" bind:value={name} required /></label><br />
  {/if}
  <button on:click={next}>Next</button>
</div>
