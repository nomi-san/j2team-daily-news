import { RSS_BASE_URL, RSS_ENTRIES, parseRssXml } from '$lib/vnexpress'

/** @type {import('@sveltejs/kit').RequestHandler} */
export const get = async ({ params }) => {

    const entry = RSS_ENTRIES
        .find(({ path }) => path === params.entry)

    if (entry) {
        const resp = await fetch(`${RSS_BASE_URL}/${entry.path}.rss`)

        if (resp.ok) {
            const xml = await resp.text()
            const items = parseRssXml(xml)

            if (items) {
                return {
                    status: 200,
                    body: {
                        ...entry,
                        items
                    }
                }
            }
        }

        return {
            status: 404,
            body: { 'error': 'Failed to process data.' }
        }
    }
    
    return {
        status: 404,
        body: { 'error': 'Entry not found.' }
    }
}