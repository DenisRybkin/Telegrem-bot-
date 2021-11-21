import {bot, setMindIsTyping} from "../index.js";
import {actionsPC} from "./actionsPC.js";
import {saveMind} from "./firebase/addMind.js";

export class ManagerEvents {
    constructor(voiceMsg,chatId,voiceId) {
        this.voiceMsg = voiceMsg;
        this.chatId = chatId;
        this.voiceId = voiceId;
    }

    reconstructor(voiceMsg,chatId,voiceId) {
        this.voiceMsg = voiceMsg;
        this.chatId = chatId;
        this.voiceId = voiceId;
    }

    async shutdownPC () {
        await bot.sendMessage(this.chatId, 'Выключаю компьютер!');
        await bot.sendSticker(this.chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/19.webp');
        actionsPC.shutdown();
    }

    async rebootPC () {
        await bot.sendMessage(this.chatId, 'перезагружаю компьютер');
        await bot.sendSticker(this.chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/8.webp');
        actionsPC.reboot();
    }

    async sleepMode () {
        await bot.sendMessage(this.chatId, 'Перевожу в спящий режим!');
        await bot.sendSticker(this.chatId, 'https://tlgrm.ru/_/stickers/629/439/62943973-f1e5-422a-91ff-0436fd9c9722/21.webp')
        actionsPC.sleepMod();
    }

    async savingMind () {
        setMindIsTyping(false);
        const result = await saveMind(this.voiceMsg, 'voice',this.voiceId);
        await bot.sendMessage(this.chatId, result);
    }
    async reRecording () {
        await bot.sendMessage(this.chatId, 'Давай перезапишем, повтори!');
    }
}