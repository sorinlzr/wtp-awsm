import asyncHandler from "express-async-handler"
import { getTextTopic }  from '../service/textAnalysisService.js';

const textAnalysisController = {};

const getTextTopicHandler = asyncHandler(async (req, res) => {
    const textToAnalyze = req.body.postText;
    try {
        const topic = await getTextTopic(textToAnalyze);
        const firstThreeTopics = topic.topics.slice(0, 3).map(topic => topic.label);

        res.status(200).json({ data: firstThreeTopics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during text analysis' });
    }
})

textAnalysisController.getTextTopic = getTextTopicHandler;

export default textAnalysisController;
