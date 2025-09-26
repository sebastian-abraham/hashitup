<script>
  export let data;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let dateOfBirth = data.dateOfBirth;
  let skills = data.skills || [];
  let skillInput = '';
  let status = data.status;
  const statusOptions = ['Student', 'Graduate', 'Working', 'Unemployed'];

  function addSkill() {
    if (skillInput.trim()) {
      skills = [...skills, skillInput.trim()];
      skillInput = '';
    }
  }
  function removeSkill(idx) {
    skills = skills.filter((_, i) => i !== idx);
  }
  function next() {
    dispatch('next', { dateOfBirth, skills, status });
  }
  function prev() {
    dispatch('prev');
  }
</script>

<div>
  <h2>Step 2: Profile Details</h2>
  <label>Date of Birth: <input type="date" bind:value={dateOfBirth} required /></label><br />
  <label>Skills:</label>
  <div>
    <input type="text" bind:value={skillInput} placeholder="Add skill" />
    <button type="button" on:click={addSkill}>Add</button>
  </div>
  <ul>
    {#each skills as skill, idx}
      <li>{skill} <button type="button" on:click={() => removeSkill(idx)}>Remove</button></li>
    {/each}
  </ul>
  <label>Status:
    <select bind:value={status} required>
      <option value="" disabled selected>Select status</option>
      {#each statusOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </label><br />
  <button on:click={prev}>Back</button>
  <button on:click={next}>Next</button>
</div>
