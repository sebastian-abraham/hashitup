<script>
  import Step1 from '$lib/components/SignupStep1.svelte';
  import Step2 from '$lib/components/SignupStep2.svelte';
  import Step3 from '$lib/components/SignupStep3.svelte';
  import { signupWithEmail } from '$lib/api/auth.js';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/api/firebase.js';
  import { onAuthStateChanged } from 'firebase/auth';

  let step = 1;
  let signupData = {
    email: '',
    password: '',
    name: '',
    dateOfBirth: '',
    skills: [],
    status: '',
    linkedin: '',
    github: '',
    experience: ''
  };
  let message = '';
  let loading = false;
  let googleSignup = false;

  // Redirect if already authenticated
  onAuthStateChanged(auth, (user) => {
    if (user) goto('/test/dashboard');
  });

  function nextStep(data) {
    signupData = { ...signupData, ...data };
    step = step + 1;
  }
  function prevStep() {
    step = step - 1;
  }

  async function handleConfirm() {
    loading = true;
    message = '';
    try {
      await signupWithEmail(signupData);
      goto('/test/dashboard');
    } catch (err) {
      message = err.message || 'Signup failed.';
    } finally {
      loading = false;
    }
  }
</script>

<main>
  <h1>Sign Up</h1>
  {#if step === 1}
    <Step1 data={signupData} on:next={e => nextStep(e.detail)} googleSignup={googleSignup} />
  {:else if step === 2}
    <Step2 data={signupData} on:next={e => nextStep(e.detail)} on:prev={prevStep} />
  {:else if step === 3}
    <Step3 data={signupData} on:confirm={handleConfirm} on:prev={prevStep} loading={loading} />
  {/if}
  {#if message}
    <p>{message}</p>
  {/if}
</main>
