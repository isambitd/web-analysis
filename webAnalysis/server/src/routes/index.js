import express from 'express';
import analysis from "../api/analysis";
const router = express.Router();

//For any request coming for analysis it will call analysis -> index.js	
router.use('/analysis', analysis);

export default router;
