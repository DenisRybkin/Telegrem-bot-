const {doc, deleteDoc } = require("firebase/firestore");
const db = require("./index");
const fetchData = require('./fetchData')

const deleteMind = async (id) => {
    const resultData = await fetchData(true);

    if(id > resultData.length){
        return "Не удалось удалить эту мысль, слишком большое число!"
    } else {
        await deleteDoc(doc(db, "Minds", resultData[id-1]));
        return "Мысль успешно была удаленна!"
    }

}
const deleteAllMinds = async () => {
    const resultData = await fetchData(true);

    if(resultData.length === 0){
        return "Список мыслей уже пуст"
    } else {
        let i = 0;
        for (const id of resultData) {
            await deleteDoc(doc(db, "Minds", resultData[i]));
            i++;
        }
        return "Все мысли были успешно удаленны!"
    }

}
module.exports.deleteMind = deleteMind;
module.exports.deleteAllMinds = deleteAllMinds;