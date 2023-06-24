import express from 'express';
import textAnalysisController from '../controllers/textAnalysisController.js';

const textAnalysisRouter = express.Router();

/**
 * @swagger
 * /api/analyseText:
 *   post:
 *     summary: Analyze text and retrieve topic labels
 *     tags:
 *       - Text Analysis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postText:
 *                 type: string
 *             required:
 *               - postText
 *     responses:
 *       200:
 *         description: Successful response with an array of topic labels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
textAnalysisRouter.post(
    "/",
    textAnalysisController.getTextTopic
);

export default textAnalysisRouter;
