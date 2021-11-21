import { collection, addDoc } from "firebase/firestore";
import {db} from "./index.js";

export const saveMind = async (msg, type,voiceId = null) => {
    try {
        const data = {
            mind: msg,
            typeOfAddition : type,
        }
        console.log(voiceId, 'loxara');
        if(voiceId){
            data.voiceId = voiceId
        }
        await addDoc(collection(db, "Minds"), data);
        return 'Добавление произошло успешно ✅'
    } catch (e) {
        console.error("Error adding document: ", e);
        return 'Произошла ошибка при сохранение вашей мысли на сервер ⚠️'
    }
}