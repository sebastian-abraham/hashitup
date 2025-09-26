<script>
    function handleClick() {
        alert('Getting Started!');
    }
</script>

<main>
    <div class="sub">
        <button class="my-button" on:click={handleClick}>
            Get Started
        </button> 
    </div> 
</main>

<style>
    .my-button {
        background-color: black;
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