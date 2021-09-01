const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
var exec = require('child_process').exec;
const { exit } =  require('process');

const token = '1948505395:AAFVQ1EaHy8FeEggsX-aphXCIaIUE3PGN1w';
const YA_API_KEY = 'AQVNzdbALO0k749vmkj7UJV89nSr4OUeEIiunQRU';

const bot = new TelegramBot(token, {polling: true});

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});


bot.on('message', (msg) => {
    const messageID = msg.message_id;
    const chatId = msg.chat.id;
    if(msg.chat.username === 'calmfish'){
        if(msg.text){
            if((msg.text.toLowerCase() === 'пк' ||
                msg.text.toLowerCase() === 'открыть меню возможностей 💁🏻') && msg.message_id === messageID){
                msg.text = 'pusto';
                bot.sendMessage(chatId , 'Что ты хочешь сделать с ПК ?', {
                    reply_markup :{
                        inline_keyboard : [
                            [
                                {
                                    text: 'Выключить 🙆🏻',
                                    callback_data : 'shutdown',
                                }
                            ],
                            [
                                {
                                    text : 'Перезагрузить 👀',
                                    callback_data : 'reboot',
                                }
                            ],
                            [
                                {
                                    text: 'Спящий режим 💆🏻',
                                    callback_data: 'sleepMode',
                                }
                            ],
                            [
                                {
                                    text: 'Отмена! 🙅🏻',
                                    callback_data: 'cancel',
                                }
                            ]
                        ],
                    }
                });
            }
            if(msg.text === 'pusto'){
                return;
            }
            if((msg.text !== 'Открыть меню возможностей 💁🏻' && msg.text !== 'Закрыть клавиатуру 🤓')) {
                bot.sendMessage(chatId, 'Я тебя услышал, но чет не получилось распознать че ты' +
                    ' хочешь 🤨 😑, поэтому отрою клавиатуру');
                bot.sendMessage(chatId, 'Открываю клавиатуру', {
                    reply_markup : {
                        keyboard : [
                            [
                                {text : 'Закрыть клавиатуру 🤓',},
                                {
                                    text: 'Открыть меню возможностей 💁🏻',
                                    callback_data: 'openMenu',
                                }
                            ]
                        ],
                        one_time_keyboard : true,
                    }
                })
            }
            bot.on('callback_query', (query) => {
                const chatId = query.from.id;
                bot.sendMessage(chatId, `окей, запускаю ${query.data} 👀`);
                if(query.data === 'shutdown'){
                    exec('shutdown.exe -s -t 10', function(error, stdout, stderr) {
                        console.log('shutdown.exe -s -t 10');
                        exit(-1);
                    });
                }
                if(query.data === 'reboot'){
                    exec('shutdown.exe -r -t 10', function(error, stdout, stderr) {
                        console.log('shutdown.exe -r -t 10');
                        exit(-1);
                    });
                }
                if(query.data === 'sleepMode'){
                    exec('rundll32 powrprof.dll,SetSuspendState', function(error, stdout, stderr) {
                        console.log('rundll32 powrprof.dll,SetSuspendState')
                    });
                }
                if(query.data === 'cancel'){
                    bot.deleteMessage(chatId, query.message.message_id);
                    bot.sendMessage(query.from.id, 'Отмена произведена! 🤷🏻');
                }
            });
        }else {
            const stream = bot.getFileStream(msg.voice.file_id);
            let chunks = [];
            stream.on('data', chunk => chunks.push(chunk));
            stream.on('end', () => {
                const axiosConfig = {
                    method: 'POST',
                    url: 'https://stt.api.cloud.yandex.net/speech/v1/stt:recognize',
                    headers : {
                        Authorization : 'Api-key ' + YA_API_KEY,
                    },
                    data : Buffer.concat(chunks),
                };
                axios(axiosConfig).then(response => {
                    const command =  response.data.result;
                    const chatId = msg.chat.id;
                    if(command.toLowerCase() === 'выключи компьютер'){
                        bot.sendMessage(chatId, 'Выключаю компьютер!');
                           exec('shutdown.exe -s -t 00', function(error, stdout, stderr) {
                            console.log('shutdown.exe -s -t 00');
                            exit(-1);
                        });
                    }
                    if(command.toLowerCase() === 'перезагрузи компьютер!'){
                        bot.sendMessage(chatId, 'перезагружаю компьютер');
                        exec('shutdown.exe -r -t 10', function(error, stdout, stderr) {
                            console.log('shutdown.exe -s -t 00');
                            exit(-1);
                        });
                    }
                    if(command.toLowerCase() === 'перейди в спящий режим'){
                        bot.sendMessage(chatId, 'Перевожу в спящий режим!');
                        exec('rundll32 powrprof.dll,SetSuspendState', function(error, stdout, stderr) {
                            console.log('shutdown.exe -s -t 00')
                        });
                    }
                    else {
                        bot.sendMessage(chatId, 'Не понял че ты хочешь???!');
                    }
                }).catch((err) => {
                    console.log("Произошла ошибка при попытка распознавания речи! :", err.response);
                })
            });
        }
    } else {
        bot.sendMessage(chatId, 'Вы не мой хозяин и не можете мной управлять🤬');
    }

});
bot.on("polling_error", console.log)