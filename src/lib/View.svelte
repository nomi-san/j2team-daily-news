<script>
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { toJpeg } from 'html-to-image'

    /** @type {string} */
    export let name
    /** @type {import('./vnexpress').Item} */
    export let item

    let elNews
    let imageUrl = `${item.id}.jpg`

    // Save image.
    const saveImage = () => {
        toJpeg(elNews, { quality: 0.95 })
            .then(dataUrl => {
                const a = document.createElement('a')
                a.download = imageUrl
                a.href = dataUrl
                a.click()
            })
    }

    const close = () => {
        item = null
        // Enable scrolling.
        document.documentElement.classList.remove('no-scroll')
    }

    onMount(() => {
        // Disable scrolling.
        document.documentElement.classList.add('no-scroll')
    })
</script>

{#if item}
    <div transition:fade={{ duration: 150 }} class="modal is-active">
        <div class="modal-background" on:click={close}></div>
        <div class="modal-card">
            <section class="modal-card-body" style="padding: 0 0 20px 0;" bind:this={elNews}>
                <figure class="image">
                    <img src={item.image} alt="" />
                    <span class="mask"><img src="/favicon.png" alt="" />J2TEAM News</span>
                </figure>
                <div class="body">
                    <h3 class="title" contenteditable="true">{item.title}</h3>
                    <p class="description" contenteditable="true">{item.description}</p>
                    <p class="source">vnexpress.net // {name}</p>
                </div>
            </section>
            <footer class="modal-card-foot level-right">
                <input class="input" type="text" bind:value={imageUrl} />
                <button class="button is-success" on:click={saveImage} disabled={!imageUrl}>
                    <span class="icon">
                        <i class="bi bi-download" />
                    </span>
                </button>
                <a class="button is-info" href={item.link} target="_blank">
                    <span class="icon">
                        <i class="bi bi-box-arrow-up-right" />
                    </span>
                </a>
            </footer>
        </div>
    </div>
{/if}

<style>
    .modal {
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
    }

    .input {
        margin-right: 8px;
    }

    :global(html.no-scroll) {
        overflow-y: hidden;
    }

    .title {
        margin-top: 20px;
        font-size: 28px;
        font-weight: 500;
    }

    .description {
        font-size: 19px;
        margin-bottom: 24px;
        color: #111;
    }

    .source {
        text-align: right;
        font-style: italic;
    }

    .image {
        background-color: #6c7d94;
    }

    .image img {
        max-width: 80%;
        margin: auto;
        pointer-events: none;
    }

    .mask {
        display: flex;
        align-items: center;
        position: absolute;
        right: 20px;
        bottom: 0;
        font-size: 34px;
        font-weight: bold;
        color: #fff;
        opacity: 0.4;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .mask img {
        margin-right: 10px;
        width: 60px;
        display: flex;
        filter: brightness(0) invert(1) drop-shadow(1px 1px 0 black) drop-shadow(-1px -1px 0 black);
    }

    .body {
        background-image: url('/j2team-mask.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        padding: 0 20px;
        -webkit-font-smoothing: antialiased;
    }

    footer {
        border-radius: 0;
    }
</style>