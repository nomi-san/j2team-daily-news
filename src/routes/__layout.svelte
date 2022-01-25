<script>
    // Import styles.
    import 'normalize.css/normalize.css'
    import 'nprogress/nprogress.css'
    import 'bulma/css/bulma.css'
    import 'bootstrap-icons/font/bootstrap-icons.css'

    import NProgress from 'nprogress'

    // Setup NProgress.
    NProgress.configure({
        minimum: 0.1,
        showSpinner: false,
    })
</script>

<svelte:window
    on:sveltekit:navigation-start={() => {
        NProgress.start()
    }}
    on:sveltekit:navigation-end={() => {
        NProgress.done()
    }}
/>

<svelte:head>
    <title>J2TEAM Daily News</title>
</svelte:head>

<main>
    <slot />
</main>

<footer>
    Daily news via <a href="vnexpress.vn" target="_blank">VnExpress.vn</a>
</footer>

<style>
    main {
        padding  : 30px 10px;
        max-width: 760px;
        margin   : auto;
    }

    footer {
        margin-top: 20px;
        padding: 30px 0;
        text-align: center;
    }
</style>