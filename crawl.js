const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedURL = `${urlObj.hostname}${urlObj.pathname}`
    if (normalizedURL.endsWith('/')) {
        normalizedURL = normalizedURL.slice(0, -1)
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    links.forEach(link => {
        const href = link.getAttribute('href')
        if (href) {
            const url = new URL(href, baseURL)
            urls.push(url.toString())
        }
    })
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}