import process from "process";
import axios from'axios';
import {handlerVoiceMessages} from './handlerVoiceMesages.js';
import {bot} from '../index.js'

export const voiceRecognition = async (msg,mindIsWritten = false) => {
    const voiceId = msg.voice.file_id;
    const stream = bot.getFileStream(voiceId);
    let chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => {
        const axiosConfig = {
            method: 'POST',
            url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
            headers: {
                Authorization: 'Api-key ' + process.env.YA_API_KEY,
            },
            data: Buffer.concat(chunks),
        };
        // bot.sendVoice(msg.chat.id,msg.voice.file_id);
        axios(axiosConfig).then(async response => {
            const voiceMsg = response.data.result;
            const chatId = msg.chat.id;
            await handlerVoiceMessages(voiceMsg, chatId, mindIsWritten,voiceId);
        }).catch((err) => {
            console.log("Произошла ошибка при попытка распознавания речи! :", err.response);
        })
    });
}