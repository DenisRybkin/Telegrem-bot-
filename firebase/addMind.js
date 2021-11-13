const { collection, addDoc } = require("firebase/firestore");
const db = require("./index");

const addMind = async (msg) => {
    try {
        await addDoc(collection(db, "Minds"), {
            mind: msg,
        });
        return 'Добавление произошло успешно ✅'
    } catch (e) {
        console.error("Error adding document: ", e);
        return 'Произошла ошибка при сохранение вашей мысли на сервер ⚠️'
    }
}

module.exports = addMind;
