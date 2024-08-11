import { database } from './firebase';
import { push, set, ref, get, child } from "firebase/database";

export const writeToDatabase = async (path: string, data: any) => {
    try {
        await set(ref(database, path), data);
        console.log('Document written with ID: ', path);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const pushToDatabase = async (path: string, data: any) => {
    try {
        const pushRef = push(ref(database, path));
        await set(pushRef, data);
        console.log('Document written with ID: ', path, "/", pushRef.key);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};

export const getDataFromDatabase = async (path: string) => {
    try {
        const snapshot = await get(ref(database, path))
        if (snapshot.exists()) {
            const data = snapshot.val();
            return data;
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
};