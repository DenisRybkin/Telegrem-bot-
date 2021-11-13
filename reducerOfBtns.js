const fetchMinds = require('./firebase/fetchData');
const actionsPC = require('./actionsPC');
const setState = require('./index')
const keyboard = require("./keyboards");
const deleting = require("./firebase/deleteMind");

let minds = [];

const reducerOfBtns = async (query,bot) => {

    const chatId = query.from.id;

    await bot.sendMessage(chatId, `окей, запускаю ${query.data} 👀`);
    switch (query.data) {
        case 'shutdown' :
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/19.webp');
            actionsPC.shutdown();
            break;
        case 'reboot' :
             await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/8.webp');
            actionsPC.reboot();
            break;
        case 'sleepMode' :
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp');
            actionsPC.sleepMod();
            break;
        case 'readMinds' :
            minds = await fetchMinds();
            if(minds.length === 0){
                await bot.sendMessage(chatId, 'Список мыслей пуст!');
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/833/3af/8333afc9-e992-42b3-a63b-24a257a17608/6.webp');
            } else {
                for (let i = 0;i<minds.length; i++){
                    await bot.sendMessage(chatId, `${i+1}. ${minds[i]['mind']}`);
                    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp');
                }
            }
            break;
        case 'addMind' :
            await bot.sendMessage(chatId, 'Напишите вашу мысль  📥  или слово "Отмена" для прекращения операции 🚫');
            setState.setMindIsTyping(true);
            minds = []
            break;
        case 'deleteMind' :
            await bot.sendMessage(chatId, 'Напишите номер мысли, которую вы хотите удалить');
            setState.setNumberMindIsTyping(true);
            minds = [];
            await bot.sendMessage(chatId, 'введите номер вашей мысли 🌚', keyboard.numbersMenu);
            break;
        case 'deleteAllMinds' :
            minds = [];
            deleting.deleteAllMinds().then(async (response) => {await bot.sendMessage(chatId, response)});


    }
}


module.exports =  reducerOfBtns;