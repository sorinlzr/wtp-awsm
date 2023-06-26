import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import axios from 'axios';

const translationService = {};

const getLanguages = async () => {
    try {
        const response = await axios.get(`http://${process.env.LIBRETRANSLATE_HOST}:${process.env.LIBRETRANSLATE_PORT}/languages`);
        const languages = response.data;

        return languages;
    } catch (error) {
        throw new Error('An error occurred while getting the supported languages');
    }
};

const translateText = async (text, sourceLanguage, targetLanguage) => {
    try {
        // Send translation request to LibreTranslate
        const response = await axios.post(`http://${process.env.LIBRETRANSLATE_HOST}:${process.env.LIBRETRANSLATE_PORT}/translate`, {
            q: text,
            source: sourceLanguage,
            target: targetLanguage
        });

        // Extract the translated text from the response
        const translatedText = response.data.translatedText;
        return translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        throw new Error('Translation failed');
    }
};

const detectLanguage = async (text) => {
    try {
        const response = await fetch(`http://${process.env.LIBRETRANSLATE_HOST}:${process.env.LIBRETRANSLATE_PORT}/detect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q: text }),
        });

        if (response.ok) {
            const data = await response.json();
            let detectedLanguage = '';
            if (data[0].language) {
                detectedLanguage = data[0].language;
                console.log(`detected language: ${detectedLanguage}`);
                return detectedLanguage;
            } else {
                return 'en';
            }
        } else {
            throw new Error('An error occurred while detecting the language');
        }
    } catch (error) {
        console.error('An error occurred while detecting the language:', error);
        throw new Error('An error occurred while detecting the language');
    }
};


// Function to automatically detect language and translate text to the default user language
// Hardcoded to English for now
const autoTranslate = async (text) => {
    try {
        const detectedLanguage = await detectLanguage(text);
        const translatedText = await translateText(text, detectedLanguage, 'en');

        return translatedText;
    } catch (error) {
        throw new Error('An error occurred while auto-translating the text');
    }
};

translationService.translateText = translateText;
translationService.getLanguages = getLanguages;
translationService.detectLanguage = detectLanguage;
translationService.autoTranslate = autoTranslate;

export default translationService;