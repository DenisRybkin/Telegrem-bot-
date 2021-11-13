require('dotenv').config();
const process = require("process");
const axios = require('axios');
const actionsPC = require('./actionsPC')

const voiceRecognition = (msg,bot) => {

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
                    actionsPC.shutdown();
                    break;
                case 'перезагрузи компьютер!' :
                    await bot.sendMessage(chatId, 'перезагружаю компьютер');
                    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/8.webp');
                    actionsPC.reboot();
                    break;
                case 'перейди в спящий режим' :
                    await bot.sendMessage(chatId, 'Перевожу в спящий режим!');
                    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp')
                    actionsPC.sleepMod();
                    break;
                default :
                    await bot.sendMessage(chatId, 'Не понял,что ты сказал? а ну повтори, шерсть!');
                    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/20.webp')
                    break;
            }
        }).catch((err) => {
            console.log("Произошла ошибка при попытка распознавания речи! :", err.response);
        })
    });
} 

module.exports = voiceRecognition;