import {keyboards} from './keyboards.js';
import {saveMind} from './firebase/addMind.js';
import {deleteMind} from './firebase/deleteMind.js';
import {bot, setMindIsTyping, setIndexMindIsTyping} from '../index.js';

export const handlerMessages = async (msg, chatId, mindIsWritten, indexMindIsWritten) => {
    if (mindIsWritten) {
        if (msg.text.toLowerCase() === 'отмена') {
            setMindIsTyping(false);
            await bot.sendMessage(chatId, 'Вы отменили добавление мотивашки в блокнот!');
        } else {
            const result = await saveMind(msg.text, 'text');
            setMindIsTyping(false);
            await bot.sendMessage(chatId, result);
        }
    } else {
        if ((msg.text.toLowerCase() === 'пк' ||
            msg.text.toLowerCase() === 'меню возможностей 💁🏻')) {
            await bot.sendMessage(chatId, 'Что ты хочешь сделать с ПК ?', keyboards.pcMenu);
        }
        if ((msg.text.toLowerCase() === 'меню блокнота мотивашек 🌍')) {
            await bot.sendMessage(chatId, '📑              Блокнот', keyboards.mindsMenu);
        }
        if (indexMindIsWritten && (Number(msg.text) > 0 && Number(msg.text) < 99)) {
            setIndexMindIsTyping(false);
            const response = await deleteMind(Number(msg.text));
            await bot.sendMessage(chatId, response, keyboards.mainMenuOptions);
        } else if (msg.text !== 'Меню возможностей 💁🏻' &&
            msg.text !== 'Закрыть клавиатуру 🤓' &&
            msg.text !== 'Меню блокнота мотивашек 🌍') {
            await bot.sendMessage(chatId, 'Я тебя услышал, но чет не получилось распознать че ты' +
                ' хочешь 🤨 😑, поэтому отрою клавиатуру');
            await bot.sendMessage(chatId, 'Открываю клавиатуру', keyboards.mainMenuOptions);
        }
    }
}