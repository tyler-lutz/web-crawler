const { argv } = require('node:process')
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (argv.length < 3) {
        console.log('No URL provided')
    }
    if (argv.length > 3) {
        console.log('Too many arguments')
    }
    const baseURL = argv[2]
    const pages = await crawlPage(baseURL, baseURL, {})
    printReport(pages)
}

main();