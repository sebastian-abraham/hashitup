<script>
</script>

<div class="container">
	<div class="top-spans">
		<span class="smart">SMART</span>
		<span class="matches">MATCHES.</span>
		<span class="seamless">SEAMLESS</span>
		<span class="work">WORK.</span>
	</div>
	<div class="content"></div>
	<div class="button_container">
		<button class="my-button" on:click={handleClick}> Get Started </button>
	</div>
	<img src="/people.png" alt="People" class="bottom-img" />
</div>

<style>
	.top-spans {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 3.0rem;
		margin-bottom: 1.5rem;
		gap: 0.2em;
		padding-left: 2vw;
	}
	.smart,
	.seamless {
		font-size: 60px;
        font-family: 'Roboto Condensed';
        font-weight: 600;
	}
	.matches {
		color: #ffd600;
		font-weight: bold;
		font-size: 40px;
	}
	.work {
		color: #00c853;
		font-weight: bold;
		font-size: 40px;
	}
    .matches,.work{
        font-family: 'Roboto Mono';
    }
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1;
	}
	.bottom-img {
		width: 91vw;
		height: 25vh;
		object-fit: cover;
		object-position: center bottom;
		margin-top: auto;
		display: block;
	}
	.button_container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;
	}
	.my-button {
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		padding: 10px 20px;
		font-size: 16px;
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
		border: none;
		border-radius: 55px;
		cursor: pointer;
	}
	.my-button:hover {
		opacity: 0.85;
	}
</style>
