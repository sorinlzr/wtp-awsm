import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import axios from 'axios';
import qs from 'qs';

export async function getTextTopic(textToAnalyze) {
    const data = qs.stringify({
        'extractors': 'topics',
        'text': textToAnalyze
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.textrazor.com',
        headers: {
            'x-textrazor-key': process.env.TEXTRAZOR_API_KEY,
            'Accept-Encoding': 'application/gzip',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        // console.log(JSON.stringify(response.data));
        return response.data.response;
    }
    catch (error) {
        console.log(error);
    }
}
