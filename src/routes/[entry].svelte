<script context="module">
    export const load = async ({ fetch, params }) => {
        const { entry } = params
        const resp = await fetch(`/${entry}.json`)
        
        if (resp.ok) {
            return {
                props: {
                    entry: await resp.json()
                }
            }
        } else {
            return {
                status: 404,
                error: new Error(`Not found.`)
            }
        }
    }

    export const prerender = true
</script>

<script>
    import View from '$lib/View.svelte'

    /** @type {{ name: string, items: import("$lib/vnexpress").Item[] }} */
    export let entry

    let selected = null
</script>

<nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/{entry.path}">{entry.name}</a></li>
    </ul>
</nav>

{#each entry.items as item, i}
    <div class="card" on:click={() => { selected = item }}>
        <div class="card-content notification is-{i % 2 === 0 ? 'white' : 'dark'}">
            <div class="content">
                <p class="subtitle">
                    {item.title}
                    <a href={item.link} target="_blank"><i class="bi bi-box-arrow-up-right" /></a>
                </p>
                <time>{item.date}</time>
            </div>
        </div>
    </div>
{/each}

{#if selected}
    <View name={entry.name} bind:item={selected} />
{/if}

<style>
    .card {
        margin-bottom: 16px;
        cursor: pointer;
    }

    .card:hover {
        transform: translateX(-6px);
        transition: ease .1s;
    }
</style>