<script>
  export let data;
  export let loading = false;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let linkedin = data.linkedin;
  let github = data.github;
  let experience = data.experience;

  function confirm() {
    dispatch('confirm', { linkedin, github, experience });
  }
  function prev() {
    dispatch('prev');
  }
</script>

<div>
  <h2>Step 3: Experience & Links</h2>
  <label>LinkedIn (optional): <input type="url" bind:value={linkedin} /></label><br />
  <label>GitHub (optional): <input type="url" bind:value={github} /></label><br />
  <label>Experience:<br />
    <textarea bind:value={experience} rows="5" cols="40" placeholder="Describe your experience with your skills..."></textarea>
  </label><br />
  <button on:click={prev}>Back</button>
  <button on:click={confirm} disabled={loading}>{loading ? 'Submitting...' : 'Confirm & Sign Up'}</button>
</div>
