"use strict";

// import { analysisService } from "./analysis.service";
// This controller fetch only basic data with all the links in the page
const getAnalysisLinks = (req, res, next) => {
  let selectedUri = req.body.uri;
  if (selectedUri) {
    console.log({ selectedUri });
  } else {
    console.log("No url in the payload");
    //If there is no uri in request body / payload
    res.send({ type: "Error", errMsg: "No url in the payload" });
  }
};
//This controller fetch the accessibility of any link
const checkValidation = async (req, res, next) => {
  let selectedUri = req.body.uri,
    index = req.body.index,
    host = req.body.host,
    timeStart = new Date().getTime();
  if (selectedUri) {

  } else {
    console.log("No url in the payload");
    //If there is no uri in request body / payload
    res.send({
      type: "Error",
      index: index,
      uri: selectedUri,
      timeTaken: Number((new Date().getTime() - timeStart) / 1000),
      errMsg: "No url in the payload"
    });
  }
};
const getAnalysisResult = async (req, res, next) => {
  let selectedUri = req.body.uri,
    timeStart = new Date().getTime();
  if (selectedUri) {

  } else {
    console.log("No url in the payload");
    //If there is no uri in request body / payload
    res.send({ type: "Error", errMsg: "no url in the payload" });
  }
};

export default {
  getAnalysisResult, checkValidation, getAnalysisLinks
} 
