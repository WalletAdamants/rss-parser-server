const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const { getLink, getAuthor, getImgAndDescription, getNormalStr } = require('../helpers/parser.helpers');
const { TARGET_RSS_URL } = require('../config/constants');

async function getBatch(html) {
  const $ = cheerio.load(html);

  const arr = [];

  $('item').each(function () {
    let title = getNormalStr($('title', this).text());
    const link = getLink($(this).html());
    const { image, description } = getImgAndDescription($('description', this).html());
    const publication_date = $('pubDate', this).text();

    const categories = [];
    $('category', this).each(function () {
      categories.push($(this).text());
    });

    let creator = getAuthor($(this).html());

    arr.push({ title, description, image, categories, publication_date, link, creator });
  });

  return arr;
}

async function getRssBatch() {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const newPage = await browser.newPage();
    await newPage.goto(TARGET_RSS_URL);
    const content = await newPage.content();

    const postsArray = await getBatch(content);

    browser.close();
    return postsArray;
  } catch (error) {
    console.log('getRssBatch', error);
  }
}

module.exports = { getRssBatch };
