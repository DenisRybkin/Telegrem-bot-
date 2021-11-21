import dotnev from 'dotenv';
dotnev.config();
import TelegramBot from 'node-telegram-bot-api';
import process from "process";
import {voiceRecognition} from './source/voiceRecognition.js';
import {handlerButtonsAction} from './source/handlerButtonsAction.js';
import {handlerMessages} from './source/handlerMessages.js'

export const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

let isNewSessionPC = true;
let mindIsWritten = false;
export function setMindIsTyping (value) {
    mindIsWritten = value;
}
let indexMindIsWritten = false
export function setIndexMindIsTyping (value) {
    indexMindIsWritten = value;
}

bot.onText(/\/echo (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    await bot.sendMessage(chatId, resp);
});

bot.on('callback_query', async (query) =>
    handlerButtonsAction(query,bot)
);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.chat.username === 'calmfish') {
        if(isNewSessionPC){
            isNewSessionPC = false;
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/33.webp');
        }
        if (msg.text) {
            await handlerMessages(msg,chatId,mindIsWritten,indexMindIsWritten);
        } else if (msg.voice) {
            voiceRecognition(msg,mindIsWritten);
        }
    } else {
        await bot.sendMessage(chatId, `Мой хозяин Денис Рыбкин, а ${msg.from.first_name} ${msg.from.last_name} не будет мной управлять🤬`);
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/27.webp');
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/fab/e9f/fabe9f3a-d6ad-4d45-8e0d-478f9278d228/3.webp');
    }
});
bot.on("polling_error", console.log);
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});