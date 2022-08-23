const path = require('path');
const fs = require('fs');

const { FRONTEND_APP_URL } = require('../config/config');
const getSuccessPageHtml = require('./getSuccessPageHtml');

function generateSuccessHtml() {
  try {
    const filePath = path.resolve(__dirname, '..', 'static/success.html');

    if (!fs.existsSync(filePath)) {
      const str = getSuccessPageHtml(FRONTEND_APP_URL);
      fs.writeFile(filePath, str, (err) => {
        if (err) {
          console.log('generateSuccessHtml fs.writeFile error', err);
        }
      });
    }
  } catch (error) {
    console.log('generateSuccessHtml: ', error);
  }
}

module.exports = generateSuccessHtml;
