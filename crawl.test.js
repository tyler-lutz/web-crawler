const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('normalizeURL', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BlOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute path', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev">Boot.dev</a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative path', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/about">About</a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = ['https://blog.boot.dev/about']
    expect(actual).toEqual(expected)
})