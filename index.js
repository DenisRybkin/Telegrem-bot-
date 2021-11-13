require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const saveMind = require("./firebase/addMind");
const deleting = require("./firebase/deleteMind");
const process = require("process");
const keyboard = require('./keyboards');
const voiceRecognition = require('./voiceRecognition');
const reducerOfBtns = require('./reducerOfBtns');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

let isNewSessionPC = true;
let mindIsWritten = false;
function setMindIsTyping (value) {
    mindIsWritten = value;
}
let numberMindIsWritten = false;
function setNumberMindIsTyping (value) {
    numberMindIsWritten = value;
}

const switcher = async (msg, chatId) => {
    if(mindIsWritten){
        if(msg.text.toLowerCase() === 'отмена'){
            mindIsWritten = false;
            await bot.sendMessage(chatId, 'Вы отменили добавление мысли в блокнот!');
        } else {
            const result = await saveMind(msg.text);
            mindIsWritten = false;
            await bot.sendMessage(chatId, result);
        }
    } else {
        if ((msg.text.toLowerCase() === 'пк' ||
            msg.text.toLowerCase() === 'открыть меню возможностей 💁🏻')) {
            await bot.sendMessage(chatId, 'Что ты хочешь сделать с ПК ?', keyboard.pcMenu);
        }
        if ((msg.text.toLowerCase() === 'открыть меню блокнота мыслей 🌍')){
            await bot.sendMessage(chatId, '📑              Блокнот', keyboard.mindsMenu);
        }
        if(numberMindIsWritten && (Number(msg.text)> 0 && Number(msg.text) < 99)){
            numberMindIsWritten = false;
            const response = await deleting.deleteMind(Number(msg.text));
            await bot.sendMessage(chatId, response, keyboard.mainMenuOptions);
        }
        else if (msg.text !== 'Открыть меню возможностей 💁🏻' &&
            msg.text !== 'Закрыть клавиатуру 🤓' &&
            msg.text !== 'Открыть меню блокнота мыслей 🌍') {
            await bot.sendMessage(chatId, 'Я тебя услышал, но чет не получилось распознать че ты' +
                ' хочешь 🤨 😑, поэтому отрою клавиатуру');
            await bot.sendMessage(chatId, 'Открываю клавиатуру', keyboard.mainMenuOptions);
        }
    }
}

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.on('callback_query', async (query) =>
    reducerOfBtns(query,bot)
);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if(isNewSessionPC){
        isNewSessionPC = false;
        await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/33.webp');
    }
    if (msg.chat.username === 'calmfish') {
        if (msg.text) {
            await switcher(msg,chatId);
        } else {
            voiceRecognition(msg,bot);
        }
    } else {
        await bot.sendMessage(chatId, `Мой хозяин Денис Рыбкин, а ${msg.from.first_name} ${msg.from.last_name} не будет мной управлять🤬`);
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/27.webp');
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/fab/e9f/fabe9f3a-d6ad-4d45-8e0d-478f9278d228/3.webp');
    }
});
bot.on("polling_error", console.log);

module.exports.setMindIsTyping = setMindIsTyping;
module.exports.setNumberMindIsTyping = setNumberMindIsTyping;