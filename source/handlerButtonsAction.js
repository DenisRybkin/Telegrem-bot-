import {fetchMinds} from './firebase/fetchData.js';
import {deleteMind,deleteAllMinds} from "./firebase/deleteMind.js";
import {keyboards} from './keyboards.js';
import {actionsPC} from './actionsPC.js';
import {setIndexMindIsTyping,setMindIsTyping} from '../index.js';
import {bot} from '../index.js';
import {ME} from "./handlerVoiceMesages.js";

let minds = [];

export const handlerButtonsAction = async (query) => {

    const chatId = query.from.id;

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
                await bot.sendMessage(chatId, 'Список мотивашек пуст!');
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/833/3af/8333afc9-e992-42b3-a63b-24a257a17608/6.webp');
            } else {
                for (let i = 0;i<minds.length; i++){
                    await bot.sendMessage(chatId, `${i+1}. ${minds[i]['mind']}`);
                }
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp');
            }
            break;
        case 'addMind' :
            await bot.sendMessage(chatId, 'Напишите вашу мотивашку  📥  или слово "Отмена" для прекращения операции 🚫');
            setMindIsTyping(true);
            minds = []
            break;
        case 'deleteMind' :
            await bot.sendMessage(chatId, 'Напишите номер мотивашки, которую вы хотите удалить');
            setIndexMindIsTyping(true);
            minds = [];
            await bot.sendMessage(chatId, 'Введите номер вашей мотивашки 🌚', keyboards.numbersMenu);
            break;
        case 'deleteAllMinds' :
            minds = [];
            deleteAllMinds().then(async (response) => {await bot.sendMessage(chatId, response)});
            break;
        case 'confirmMindSave':
            await ME.savingMind();
            break;
        case 'unConfirmMindSave':
            await ME.reRecording();
            break;
        case 'cancel' :
        await bot.deleteMessage(chatId,query.message.message_id);
    }
}