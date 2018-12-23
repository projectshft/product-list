const querystring = require('querystring');
const url = require('url');

//a helper function to get the page number out of the products search query
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

//ensures a string that has the first letter capitalized
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

module.exports =  { checkPageNumber, capitalize };

