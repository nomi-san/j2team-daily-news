// Special thanks to VnExpress RSS 😪

/**
 * @typedef Item
 * @prop {string} id
 * @prop {string} title
 * @prop {string} description
 * @prop {string} image
 * @prop {string} link
 * @prop {number} date
 */

/**
 * @typedef Entry
 * @prop {string} name
 * @prop {string} path
 */

/**
 * @typedef {{ title: string, description: string, pubDate: string, link: string }} RawItem
 * @typedef {{ rss: { channel: { pubDate: string, item: RawItem[] } } }} RawRss
 */

export const RSS_BASE_URL = 'https://vnexpress.net/rss'

/** @type {Entry[]} */
export const RSS_ENTRIES = [
    {
        name: 'Tin mới nhất',
        path: 'tin-moi-nhat'
    },
    {
        name: 'Tin nổi bật',
        path: 'tin-noi-bat'
    },
    // {
    //     name: 'Tin xem nhiều',
    //     path: 'tin-xem-nhieu'
    // },
    {
        name: 'Thế giới',
        path: 'the-gioi'
    },
    {
        name: 'Thời sự',
        path: 'thoi-su'
    },
    {
        name: 'Kinh doanh',
        path: 'kinh-doanh'
    },
    // {
    //     name: 'Startup',
    //     path: 'startup'
    // },
    {
        name: 'Giải trí',
        path: 'giai-tri'
    },
    {
        name: 'Thể thao',
        path: 'the-thao'
    },
    {
        name: 'Pháp luật',
        path: 'phap-luat'
    },
    {
        name: 'Giáo dục',
        path: 'giao-duc'
    },
    {
        name: 'Sức khỏe',
        path: 'suc-khoe'
    },
    {
        name: 'Đời sống',
        path: 'doi-song'
    },
    {
        name: 'Du lịch',
        path: 'du-lich'
    },
    {
        name: 'Khoa học',
        path: 'khoa-hoc'
    },
    {
        name: 'Số hóa',
        path: 'so-hoa'
    },
    {
        name: 'Xe',
        path: 'oto-xe-may'
    },
    {
        name: 'Ý kiến',
        path: 'y-kien'
    },
    {
        name: 'Tâm sự',
        path: 'tam-su'
    },
    {
        name: 'Cười',
        path: 'cuoi'
    }
]

import { XMLParser } from 'fast-xml-parser'

/**
 * Parse raw RSS XML.
 * @param {string} xml 
 * @returns {Item[]}
 */
export const parseRssXml = (xml) => {
    try {
        // Parse XML.
        const parser = new XMLParser()
        /** @type {RawRss} */
        const { rss } = parser.parse(xml)

        // Validate object.
        if (!('channel' in rss)) return null
        if (!('item' in rss.channel)) return null
        if (!Array.isArray(rss.channel.item)) return null

        const { /*pubDate,*/ item } = rss.channel
        //const day = new Date(pubDate).getUTCDate()

        return item
            .map(({ title, description, pubDate, link }) => {
                const date = new Date(pubDate)
                // Current day only.
                //if (date.getUTCDate() !== day) return null

                // Unique ID from link.
                const id = link
                    .replace(/^.*[\\\/]/, '')   // Get the last part.
                    .replace('.html', '')       // Remove '.html'.

                let desc = description
                let image = 'https://s1cdn.vnecdn.net/vnexpress/restruct/i/v525/logo_default.jpg'

                if (description.includes('href=')) {
                    try {
                        desc = description.match(/\<\/a\>\<\/br\>(.*)$/)[1]
                        image = description.match(/\<img\ssrc\=\"(.*)\"/)[1]
                    } catch {
                    }
                }

                /** @returns {Item} */
                return {
                    title,
                    link,
                    id,
                    image,
                    description: desc,
                    date: date.toLocaleString('vi', { timeZone: 'Asia/Bangkok' }) // Convert to local date.
                }
            })
            .filter(i => i !== null)
    }
    catch {
        return null
    }
}