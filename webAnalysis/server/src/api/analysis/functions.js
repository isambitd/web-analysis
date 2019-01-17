import request from "request";
// isLoginForm : This method will check whether there is a login form or not
// The logic to find a login form is
// 1. there should be one text input or email input box
// 2. There should be a password input box
// 3  The submit button should contain ['signin', 'login']
const isLoginForm = $ => {
  let listOfInputs = [],
    loginFormDoc = $("input"),
    loginInPossibleValues = ["signin", "login"],
    passwordFieldCount = 0,
    emailOrTextCount = 0,
    loginButton = 0;
  $("form")
    .find("input")
    .each(function(index, el) {
      let type = $(el).attr("type");
      if (type === "text" || type === "email") {
        //If the text input type is email or text then increse the emailOrTextCount count
        emailOrTextCount++;
      } else if (type === "password") {
        //If the text input type is password then increse the passwordFieldCount count
        passwordFieldCount++;
      } else if (type === "submit") {
        var name =
            $(el).attr("name") &&
            $(el)
              .attr("name")
              .toLowerCase()
              .split(" ")
              .join(""),
          val =
            $(el).attr("value") &&
            $(el)
              .attr("value")
              .toLowerCase()
              .split(" ")
              .join("");
        if (
          loginInPossibleValues.indexOf(name) != -1 ||
          loginInPossibleValues.indexOf(val) != -1
        ) {
          //If the text input type is submit and containing ['signin', 'login'] as a name or value then increse the loginButton count
          loginButton++;
        }
      }
      listOfInputs.push({
        type: type,
        name: $(el).attr("name"),
        val: $(el).attr("value")
      });
    });
  if (emailOrTextCount > 0 && passwordFieldCount > 0 && loginButton > 0) {
    return true;
  }
  return false;
};
// getHtmlVersion: This method fetch the version of the html page
// Assuming only two types of html versions do exists
// 1. -//W3C//DTD HTML
// 2. -//W3C//DTD XHTML
// This value we can get inside 'x-publicId' field
const getHtmlVersion = $ => {
  let html4RegEx = /^(-\/\/W3C\/\/DTD HTML )(?:.*)/,
    htmlDoc = $("html");
  if (htmlDoc.length && htmlDoc[0].prev && htmlDoc[0].prev["x-publicId"]) {
    if (htmlDoc[0].prev["x-publicId"].match(html4RegEx)) {
      return "html 4";
    }
  }
  return "html 5";
};
// getAllLinks:  This method fetch all the links from all the anchors in the page
// links are there in anchor tag's href attribute
// Based on some regex we are doing the first diagnos whether it is external or internal links
// If the link is starting with some '/index' - Then we are considering this as internal link. It will be appended with host and the data will be fetched from the link
// If the link is starting with '//' then primilarily we are considering that as external link
const getAllLinks = ($, selectedUri, host) => {
  let externalLinkRegEx = /^(http)|(\/\/)(?:.*)/,
    internalLinkRegEx = /^\/[a-z0-9A-Z](?:.*)/,
    confusingLinkRegEx = /^\/\/(?:.*)/,
    links = [];
  $("a").each(function(index, el) {
    let href = $(el).attr("href");
    if (href) {
      if (href.match(externalLinkRegEx)) {
        links.push({ link: href, type: "external" });
      } else if (href.match(internalLinkRegEx)) {
        links.push({
          link: selectedUri.split("//")[0] + "//" + host + href,
          type: "internal"
        });
      }
    }
  });
  return links;
};
// checkResponse: This method will return a promise when we need to find whether a link is internal or external
// This internally fetching data for a link and checking the host name with the actual host name, If both are same then it is internal link only if not same then external link
const checkResponse = (uri, type, host) => {
  return new Promise((resolve, reject) => {
    sendRequest(uri, 5)
      .then(resp => {
        let linkHost = resp.response.request.host;
        console.log(host + "  --------->  " + linkHost);
        if (
          resp.response.request &&
          resp.response.request.host &&
          resp.response.request.host === host
        ) {
          resolve({ link: uri, accessible: true, type: "internal" });
        } else {
          resolve({ link: uri, accessible: true, type: "external" });
        }
      })
      .catch(err => {
        resolve({ link: uri, accessible: false, type: type });
      });
  });
};
// sendRequest: This method takes the uri, checks the protocol, If not there then append simple http and send that to request method to fetch data
// Returns a promise
const sendRequest = async (uri, redirectCount) => {
  const validIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    validHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
    validProtocol = /^(http)(?:.*)/,
    withoutProtocol = /^(\/\/)(?:.*)/;
  let uriToCheck = uri;
  if (!uri.match(validProtocol)) {
    if (uri.match(withoutProtocol)) {
      uriToCheck = "http:" + uri;
    } else {
      let hostName = uri.split("/")[0].split(":")[0];
      if (
        hostName.match(validHostnameRegex) ||
        hostName.match(validIpAddressRegex)
      ) {
        uriToCheck = "http://" + uri;
      }
    }
  }
  const requestParams = {
    uri: uriToCheck,
    method: "GET",
    timeout: 10000, //checks for 10 seconds
    followRedirect: true,
    maxRedirects: redirectCount || 10 // If redirect count is not passed then by default it will try for 10 times
  };
  await request(requestParams, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      return { response, body };
    } else {
      throw err;
    }
  });
};
// fetchLinksStatus: This method craetes a list of promises and call them sychrnously
// Onces that is done returns the promise with all links data inside it
const fetchLinksStatus = (links, host) => {
  return new Promise((resolve, reject) => {
    let promises = [],
      linksVerified = {
        external: [],
        internal: []
      };
    for (let p in links) {
      promises.push(checkResponse(links[p].link, links[p].type, host));
    }
    Promise.all(promises).then(values => {
      for (let p in links) {
        linksVerified[values[p].type].push({
          link: values[p].link,
          accessible: values[p].accessible
        });
      }
      let linksWithStatus = [
        {
          type: "External",
          links: linksVerified["external"]
        },
        {
          type: "Internal",
          links: linksVerified["internal"]
        }
      ];
      resolve(linksWithStatus);
    });
  });
};
// getAllHeadingsCount: This method counts all the headings in a web page and returns all the counts
const getAllHeadingsCount = $ => {
  var headings = { total: 0, list: [] };
  let i = 1;
  while (i <= 5) {
    let len = $("h" + i).length;
    headings.list.push({ type: "h" + i, count: len });
    headings["total"] += len;
    i++;
  }
  return headings;
};

export default {
  isLoginForm,
  checkResponse,
  getHtmlVersion,
  getAllLinks,
  sendRequest,
  getAllHeadingsCount,
  fetchLinksStatus
};
