export function buildURL (params) {
  let url = '';
  let first = true;
  for(let key in params) {
    params[key] = params[key].toString() //convert any value to string
    if(first && params[key].length > 0) {
      url += '?'
      first = false;
      url += `${key}=${params[key]}`
    } else if (params[key].length > 0) {
      url += '&';
      url += `${key}=${params[key]}`
    }
  }
  return url;
} 
