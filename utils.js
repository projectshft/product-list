const querystring = require('querystring');
const url = require('url');

const checkPageNumber = (req, totalObjects, itemsPerPage) => {
  const maxPages = Math.ceil(totalObjects/itemsPerPage);
  //pull the page query off the URL
  const parsedUrl = url.parse(req.originalUrl);
  let { page } = querystring.parse(parsedUrl.query);
  //user didn't include page in the query, so default to the first page
  if (typeof page === 'undefined') {
    page = 1;
  //coerce it to a number
  } else {
    page = Number(page);
  }
  //if page wasn't a number or was less than 1 or greater than max pages, handle the error
  if (!page || page < 1 || page > maxPages) {
    page = 0;
  }
  return page;
};

module.exports =  checkPageNumber;

