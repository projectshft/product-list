export function buildURL (params) {
  console.log(params)
  let url = '';
  let first = true;
  for(let key in params) {
    params[key] = params[key].toString()
    // console.log(params[key])
    if(first && params[key].length > 0) {
      url += '?'
      first = false;
      url += `${key}=${params[key]}`
    } else if (params[key].length > 0) {
      url += '&';
      url += `${key}=${params[key]}`
    }
  }
  console.log(url)
  return url;
} 
