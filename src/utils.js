const utils = {
  extractFileNameFromURL(url) {
    return url.match(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/)[0];
  }
}

export default utils;