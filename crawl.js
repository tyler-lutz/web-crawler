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

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    // If the page has already been visited, increment the count
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL] += 1
        return pages
    }

    // If the page has not been visited, add it to the pages object
    if (currentURL === baseURL) {
        pages[normalizedURL] = 0
    } else {
        pages[normalizedURL] = 1
    }

    console.log(`Crawling ${currentURL}`)
    let htmlBody = ''
    try {
        const response = await fetch(currentURL)
        if (response.status >= 400) {
            console.log(`Error, status code: ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('Content-Type')
        if (!contentType.includes('text/html')) {
            console.log(`Error: Content-Type is not HTML`)
            return pages
        }
        htmlBody = await response.text()
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }

    const nextURLs = getURLsFromHTML(htmlBody, currentURL)
    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

module.exports = {
    crawlPage,
    normalizeURL,
    getURLsFromHTML
}