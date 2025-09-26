<script>
    let email = '';
    let password = '';
    let loginMessage = '';
    let isSubmitting = false;

    async function handleLogin() {
        if (email.trim() === '' || password.trim() === '') {
            loginMessage = 'Please enter both email and password.';
            return;
        }

        isSubmitting = true; 
        loginMessage = 'Attempting to log in...';
        
        const loginPayload = {
            email: email,
            password: password
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            const success = true; 

            if (success) {
                loginMessage = 'Login successful! Redirecting to dashboard...';
            } else {
                loginMessage = 'Login failed. Invalid email or password.';
            }

        } catch (error) {
            console.error('Login Error:', error);
            loginMessage = 'An unexpected error occurred. Please check your connection.';
        } finally {
            isSubmitting = false;
        }
    }

    function handleSignup() {
        console.log('Navigating to Signup page.');
        alert('Navigating to Signup!');
        // In SvelteKit, you would use: goto('/signup')
    }
</script>

<main>
    <div class="login-container">
        <h2>LOGIN</h2>
        
        <form on:submit|preventDefault={handleLogin}>
            <div class="input-group">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    bind:value={email} 
                    required
                    disabled={isSubmitting} 
                >
            </div>
            
            <div class="input-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    bind:value={password} 
                    required
                    disabled={isSubmitting} 
                >
            </div>
            
            <button type="submit" class="login-button" disabled={isSubmitting}>
                {#if isSubmitting}
                    Logging In...
                {:else}
                    LOGIN
                {/if}
            </button>
            
            {#if loginMessage}
                <p class="message">{loginMessage}</p>
            {/if}
        </form>

        <div class="signup-prompt">
            New User?
        </div>
        
        <button on:click={handleSignup} class="signup-button">
            SIGN UP
        </button>
    </div>
</main>

<style>
    .login-button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
    
    .signup-prompt {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 5px;
        color: #555;
        font-size: 0.9em;
    }

    .signup-button {
        width: 100%;
        padding: 10px;
        background-color: #ffffff; 
        color: #0b0b0b; 
        border: 2px solid #000000;
        border-radius: 55px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .signup-button:hover {
        background-color: #292929;
        color: white;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #f0f2f5;
        font-family: Arial, sans-serif;
    }
    
    .login-container {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 350px;
    }
    
    h2 {
        text-align: center;
        margin-bottom: 25px;
        color: #333;
    }
    
    .input-group {
        margin-bottom: 15px;
    }
    
    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
    }
    
    input[type="email"], input[type="password"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    .login-button {
        width: 100%;
        padding: 12px;
        background-color: #000000;
        color: white;
        border: 2px solid white;
        border-radius: 55px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-top: 10px;
        margin-bottom: 15px;
    }
    
    .login-button:hover {
        background-color: #41464b;
    }
    
    .message {
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
        color: #4f4f4f;
    }
</style>