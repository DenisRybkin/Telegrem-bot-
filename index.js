require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const keybord = require('./keyboards');
var exec = require('child_process').exec;
const {exit} = require('process');
const process = require("process");

let isNewSessionPC = true;

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.on('callback_query', (query) => {
    const chatId = query.from.id;
    bot.sendMessage(chatId, `окей, запускаю ${query.data} 👀`);
    switch (query.data) {
        case 'shutdown' :
            exec('shutdown.exe -s -t 10', function () {
                console.log('shutdown.exe -s -t 10');
                exit(-1);
            });
            break;
        case 'reboot' :
            exec('shutdown.exe -r -t 10', function () {
                console.log('shutdown.exe -r -t 10');
                exit(-1);
            });
            break;
        case 'sleepMode' :
            exec('rundll32 powrprof.dll,SetSuspendState', function () {
                console.log('rundll32 powrprof.dll,SetSuspendState')
            });
            break;
    }
});

bot.on('message', async (msg) => {
    const messageID = msg.message_id;
    const chatId = msg.chat.id;
    if(isNewSessionPC){
        isNewSessionPC = false;
        await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/33.webp');
    }
    if (msg.chat.username === 'calmfish') {
        if (msg.text) {
            if ((msg.text.toLowerCase() === 'пк' ||
                msg.text.toLowerCase() === 'открыть меню возможностей 💁🏻') && msg.message_id === messageID) {
                await bot.sendMessage(chatId, 'Что ты хочешь сделать с ПК ?', keybord.pcMenu);
            }
            if ((msg.text !== 'Открыть меню возможностей 💁🏻' && msg.text !== 'Закрыть клавиатуру 🤓')) {
                bot.sendMessage(chatId, 'Я тебя услышал, но чет не получилось распознать че ты' +
                    ' хочешь 🤨 😑, поэтому отрою клавиатуру');
                bot.sendMessage(chatId, 'Открываю клавиатуру', keybord.mainMenuOptions)
            }
        } else {
            const stream = bot.getFileStream(msg.voice.file_id);
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
                axios(axiosConfig).then(async response => {
                    const command = response.data.result;
                    const chatId = msg.chat.id;
                    switch (command.toLowerCase()) {
                        case 'выключи компьютер' :
                            await bot.sendMessage(chatId, 'Выключаю компьютер!');
                            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/19.webp');
                            exec('shutdown.exe -s -t 00', function () {
                                console.log('shutdown.exe -s -t 00');
                                exit(-1);
                            });
                            break;
                        case 'перезагрузи компьютер!' :
                            await bot.sendMessage(chatId, 'перезагружаю компьютер');
                            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/8.webp');
                            exec('shutdown.exe -r -t 10', function () {
                                console.log('shutdown.exe -s -t 00');
                                exit(-1);
                            });
                            break;
                        case 'перейди в спящий режим' :
                            await bot.sendMessage(chatId, 'Перевожу в спящий режим!');
                            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp')
                            exec('rundll32 powrprof.dll,SetSuspendState', function () {
                                console.log('shutdown.exe -s -t 00')
                            });
                            break;
                        default :
                            await bot.sendMessage(chatId, 'Не понял');
                            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/20.webp')
                            break;
                    }
                }).catch((err) => {
                    console.log("Произошла ошибка при попытка распознавания речи! :", err.response);
                })
            });
        }
    } else {
        await bot.sendMessage(chatId, `Мой хозяин Денис Рыбкин, а ${msg.from.first_name} ${msg.from.last_name} не будет мной управлять🤬`);
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/27.webp');
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/fab/e9f/fabe9f3a-d6ad-4d45-8e0d-478f9278d228/3.webp');
    }
});
bot.on("polling_error", console.log);