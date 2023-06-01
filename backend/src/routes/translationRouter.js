import express from 'express';
import translationService from '../service/translationService.js';

const translationRouter = express.Router();

/**
 * @swagger
 * /api/translate:
 *   get:
 *     summary: Get the list of supported languages for translation.
 *     responses:
 *       '200':
 *         description: Successful retrieval of language list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: string
 *       '500':
 *         description: Retrieval of language list failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
translationRouter.get('/', async (req, res) => {
    try {
        const languages = await translationService.getLanguages();
        res.json({ languages });
    } catch (error) {
        console.error('Could not retrieve language list', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/translate:
 *   post:
 *     summary: Translate text from a source language to a target language.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               sourceLanguage:
 *                 type: string
 *               targetLanguage:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful translation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 translatedText:
 *                   type: string
 *       '500':
 *         description: Translation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
translationRouter.post('/', async (req, res) => {
    try {
        const { text, sourceLanguage, targetLanguage } = req.body;

        // Call the translateText function from the translation service
        const translatedText = await translationService.translateText(text, sourceLanguage, targetLanguage);

        res.status(200).json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

/**
 * @swagger
 * /api/translate/detect:
 *   post:
 *     summary: Detect the language of a given text.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful language detection
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detectedLanguage:
 *                   type: string
 *       '500':
 *         description: Language detection failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
translationRouter.post('/detect', async (req, res) => {
    const { text } = req.body;

    try {
        const detectedLanguage = await translationService.detectLanguage(text);
        res.json({ detectedLanguage });
    } catch (error) {
        console.error('Language detection error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/translate/auto:
 *   post:
 *     summary: Auto translate text from the detected language to English.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful auto translation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 autoTranslation:
 *                   type: string
 *       '500':
 *         description: Auto translation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
translationRouter.post('/auto', async (req, res) => {
    const { text } = req.body;

    try {
        const autoTranslation = await translationService.autoTranslate(text);
        res.json({ autoTranslation });
    } catch (error) {
        console.error('Language translation error:', error);
        res.status(500).json({ error: error.message });
    }
});


export default translationRouter;