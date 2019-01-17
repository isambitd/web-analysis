"use strict";

import express from "express";
import getAnalysisResult from "./services";

const router = express.Router();
// This request will fetch all the data at one go (All the links with their accessibility)
router.post("/all", (req, res, next) => {
  //   getAnalysisResult(req.body)
  //     .then(data => res.status(200).json({ data }))
  //     .catch(err => next(err));
});

// // This request will fetch the basic data with all the link names (No accessibility will be attached)
// router.post("/links", (req, res, next) => {
//   checkValidation.then().catch();
// });

// // This request will fetch the accessibility of a link
// router.post("/validation", (req, res, next) => {
//   getAnalysisLinks.then().catch();
// });

export default router;
