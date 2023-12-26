function printReport(pages) {
    console.log('--- REPORT ---')
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortPages(pages) {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])
    return pagesArray
}

module.exports = {
    printReport,
    sortPages
}