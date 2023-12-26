function normalizeURL(url) {
    const urlObj = new URL(url)
    let normalizedURL = `${urlObj.hostname}${urlObj.pathname}`
    if (normalizedURL.endsWith('/')) {
        normalizedURL = normalizedURL.slice(0, -1)
    }
    return normalizedURL
}

module.exports = {
    normalizeURL
}