<script>
    import { RSS_ENTRIES } from '$lib/vnexpress'

    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const groupRnd = (arr, min, max) => {
        const ret = []
        let i = 0
        arr.forEach(v => {
            if (!i--) {
                ret.push([v])
                i = rand(min, max) - 1
            } else {
                ret[ret.length - 1].push(v)
            }
        })
        return ret
    }

    /** @type {import('$lib/vnexpress').Entry[][]} */
    const entries = groupRnd(RSS_ENTRIES, 3, 4)

    const attrs = [
        'white',
        'dark',
        'light',
        'primary',
        'link',
        'info',
        'success',
        'warning'
    ]
</script>

<nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Home</a></li>
    </ul>
</nav>


<figure>
    <img src="/vnexpress-logo.jpg" alt="" >
</figure>

{#each entries as se}
    <div class="tile is-ancestor">
    {#each se as e}
        <a class="tile is-parent" href="/{e.path}">
            <article class="tile is-child box notification is-{attrs[rand(0, attrs.length - 1)]}">
                <p class="subtitle">{e.name}</p>
            </article>
        </a>
    {/each}
    </div>
{/each}

<style>
    .tile.is-parent:hover {
        transition: ease .1s;
        transform: translateY(-4px);
    }

    figure {
        text-align: center;
        margin: 20px 0;
    }
</style>
