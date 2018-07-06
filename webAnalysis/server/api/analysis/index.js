'use strict';

var express = require('express'),
	analysisController = require(__base + 'api/analysis/analysis.controller.js');

var router = express.Router();
// This request will fetch all the data at one go (All the links with their accessibility)
router.post('/all', analysisController.getAnalysisResult);

// This request will fetch the basic data with all the link names (No accessibility will be attached) 
router.post('/links', analysisController.getAnalysisLinks);

// This request will fetch the accessibility of a link
router.post('/validation', analysisController.checkValidation);

module.exports = router;
