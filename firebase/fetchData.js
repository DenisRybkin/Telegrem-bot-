const {collection, getDocs} = require("firebase/firestore");
const db = require("./index");

const fetchMinds = async (needId = false) => {
    const resultData = [];
     await getDocs(collection(db, 'Minds')).then(response => {

        response.forEach(item => {
            resultData.push(needId ? item.id : item.data());
        });
    });

    return resultData;
}

module.exports = fetchMinds;