import {collection, getDocs} from "firebase/firestore";
import {db} from "./index.js";

export const fetchMinds = async (needId = false) => {
    const resultData = [];
     await getDocs(collection(db, 'Minds')).then(response => {

        response.forEach(item => {
            resultData.push(needId ? item.id : item.data());
        });
    });

    return resultData;
}
