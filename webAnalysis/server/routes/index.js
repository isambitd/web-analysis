let express = require('express'),
	router = express.Router(),
	analysis = require(__base + 'api/analysis');

//For any request coming for analysis it will call analysis -> index.js	
router.use('/analysis', analysis);

module.exports = router;
