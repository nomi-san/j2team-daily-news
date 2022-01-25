<script context="module">
    import { dev } from '$app/env'

    export const load = ({ status, error }) => {
        return {
            props: {
                message: dev ? `${status} - ${error.message}` : 'Something went wrong?',
                stack: dev ? error.stack : '',
            },
        }
    }
</script>

<script>
    export let message
    export let stack
</script>

<!-- svelte-ignore a11y-missing-attribute -->

<nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a>Error</a></li>
    </ul>
</nav>

<h1 class="title is-4">{message}</h1>
{#if stack}
    <pre>{stack}</pre>
{/if}