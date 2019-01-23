const rp = require('request-promise')
const $ = require('cheerio')

const scraper = url => {
  rp(url)
    .then(html => {
      let title = $('title', html).text()
      return title
    })
    .catch(err => {
      console.log(err)
    })
}

scraper(
  'https://medium.freecodecamp.org/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3'
)
