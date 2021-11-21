import {bot} from "../index.js"
import {setMindIsTyping} from '../index.js';
import {keyboards} from "./keyboards.js";
import {ManagerEvents} from './managerEvents.js'


export const ME = new ManagerEvents(null,null,null,)

export const handlerVoiceMessages = async (voiceMsg,chatId, mindIsWritten= false,voiceId = null) => {

    ME.reconstructor(voiceMsg,chatId,voiceId);

    if(mindIsWritten){
        setMindIsTyping(false);
        await bot.sendMessage(chatId,voiceMsg);
        await bot.sendMessage(chatId, 'Правильно ли я тебя понял ❔', keyboards.confirmation);
    } else {
        switch (voiceMsg.toLowerCase()) {
            case 'выключи компьютер' :
                await ME.shutdownPC();
                break;
            case 'перезагрузи компьютер!' :
                await ME.rebootPC();
                break;
            case 'перейди в спящий режим' :
                await ME.sleepMode();
                break;
            default :
                await bot.sendMessage(chatId, 'Не понял,что ты сказал? а ну повтори, шерсть!');
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/20.webp')
                break;
        }
    }
}