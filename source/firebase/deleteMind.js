import {doc, deleteDoc } from "firebase/firestore";
import {db} from "./index.js";
import {fetchMinds} from './fetchData.js';

export const deleteMind = async (id) => {
    const resultData = await fetchMinds(true);

    if(id > resultData.length){
        return "Не удалось удалить эту мысль, слишком большое число!"
    } else {
        await deleteDoc(doc(db, "Minds", resultData[id-1]));
        return "Мысль успешно была удаленна ✅"
    }

}
export const deleteAllMinds = async () => {
    const resultData = await fetchMinds(true);

    if(resultData.length === 0){
        return "Список мыслей уже пуст"
    } else {
        let i = 0;
        for (const id of resultData) {
            await deleteDoc(doc(db, "Minds", resultData[i]));
            i++;
        }
        return "Все мысли были успешно удаленны ✅"
    }

}
