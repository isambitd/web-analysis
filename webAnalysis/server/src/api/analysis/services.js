"use strict";

// import cheerio from "cheerio";
// import {
//   isLoginForm,
//   checkResponse,
//   getHtmlVersion,
//   getAllLinks,
//   sendRequest,
//   getAllHeadingsCount,
//   fetchLinksStatus
// } from "./functions";
// This controller fetch only basic data with all the links in the page
const getAnalysisLinks = async requiredData => {
  let selectedUri = requiredData.uri,
    //To measure the time taken by this method to finish the job
    timeStart = new Date().getTime();
  if (selectedUri) {
    // const resp = await sendRequest(selectedUri);
    // let host = resp.response.request.host,
    //   $ = cheerio.load(resp.body),
    //   //This Object will be send as response which will contain all data
    //   json = {
    //     uri: selectedUri,
    //     host: host,
    //     title: $("title").text(),
    //     htmlVersion: analysisFunction.getHtmlVersion($),
    //     headings: analysisFunction.getAllHeadingsCount($),
    //     links: analysisFunction.getAllLinks($, selectedUri, host),
    //     loginForm: analysisFunction.isLoginForm($)
    //   };
    // console.log("Fetched Links", json.links);
    // json.timeTaken = Number((new Date().getTime() - timeStart) / 1000);
    return { data: "hello world!!!" };
  }

  console.log("No url in the payload");
  //If there is no uri in request body / payload
  throw { type: "Error", errMsg: "No url in the payload" };
};
// //This controller fetch the accessibility of any link
// const checkValidation = async (req, res, next) => {
//   let selectedUri = req.body.uri,
//     index = req.body.index,
//     host = req.body.host,
//     timeStart = new Date().getTime();
//   if (selectedUri) {
//     try {
//       const resp = await analysisFunction.sendRequest(selectedUri);
//       let linkHost = resp.response.request.host;
//       res.send({
//         type: "Success",
//         response: {
//           uri: selectedUri,
//           index: index,
//           timeTaken: Number((new Date().getTime() - timeStart) / 1000),
//           type: linkHost === host ? "internal" : "external"
//         }
//       });
//     } catch (err) {
//       console.error(err);
//       //If the Url is invalid or unreachable
//       res.send({
//         type: "Error",
//         index: index,
//         uri: selectedUri,
//         timeTaken: Number((new Date().getTime() - timeStart) / 1000),
//         errMsg: "Unable to fetch load url"
//       });
//     }
//   } else {
//     console.log("No url in the payload");
//     //If there is no uri in request body / payload
//     res.send({
//       type: "Error",
//       index: index,
//       uri: selectedUri,
//       timeTaken: Number((new Date().getTime() - timeStart) / 1000),
//       errMsg: "No url in the payload"
//     });
//   }
// };
// const getAnalysisResult = async (req, res, next) => {
//   let selectedUri = req.body.uri,
//     timeStart = new Date().getTime();
//   if (selectedUri) {
//     try {
//       const resp = analysisFunction.sendRequest(selectedUri);
//       let host = resp.response.request.host,
//         $ = cheerio.load(resp.body),
//         //This Object will be send as response which will contain all data
//         json = {
//           uri: selectedUri,
//           title: $("title").text(),
//           htmlVersion: analysisFunction.getHtmlVersion($),
//           headings: analysisFunction.getAllHeadingsCount($),
//           links: [],
//           loginForm: analysisFunction.isLoginForm($)
//         },
//         links = analysisFunction.getAllLinks($, selectedUri, host);
//       console.log("Fetched links ", links);
//       analysisFunction.fetchLinksStatus(links, host).then(linksWithStatus => {
//         json["links"] = linksWithStatus;
//         json.timeTaken = Number((new Date().getTime() - timeStart) / 1000);
//         res.send({ type: "Success", response: json });
//       });
//     } catch {
//       error => {
//         console.error(error);
//         //If the Url is invalid or unreachable
//         res.send({
//           type: "Error",
//           errMsg: "Unable to load url " + selectedUri
//         });
//       };
//     }
//   } else {
//     console.log("No url in the payload");
//     //If there is no uri in request body / payload
//     res.send({ type: "Error", errMsg: "no url in the payload" });
//   }
// };

// export default {
//   getAnalysisResult,
//   checkValidation,
//   getAnalysisLinks
// };
export default getAnalysisResult;
