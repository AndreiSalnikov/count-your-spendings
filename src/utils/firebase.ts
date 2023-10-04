import {initializeApp} from 'firebase/app';
import {IWriteProps,IOperation} from './types'
import {getDatabase, ref, push, child, update, onValue} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// const writeAdd = ({userId, data}: IWriteProps): void => {
//
//     const {sum, operationName, date, category, id} = data;
//
//     set(ref(database, 'users/' + userId), {
//         spend: {
//             [id]:
//                 {
//                     sum: sum,
//                     operationName: operationName,
//                     date: date,
//                     category: category,
//                 },
//         },
//         // revenue: email, // <-- Note: 'email' is not defined in the code provided.
//     })
//         .then(() => {
//             // Data saved successfully!
//         })
//         .catch((error) => {
//             console.error(error);
//             // The write failed...
//         });
// };

// const updateAdd = ({userId, data}: IWriteProps): void => {
//     const {sum, operationName, date, category, id} = data;
//     const dataNew = {
//         sum: sum,
//         operationName: operationName,
//         date: date,
//         category: category,
//     }
//
//     set(ref(database, `users/${userId}/spend/${id}`),dataNew
//     )
//         .then(() => {
//             // Data saved successfully!
//         })
//         .catch((error) => {
//             console.error(error);
//             // The write failed...
//         });
// }



/*const updateAdd = ({userId, data}: IWriteProps): void => {

    const {sum, operationName, date, category} = data;
    const dataNew = {
        sum: sum,
        operationName: operationName,
        date: date,
        category: category,
    }

    const newPostKey = push(child(ref(database), 'spend')).key;
    const updates = {};
    // @ts-ignore
    updates[`users/${userId}/spend/${newPostKey}`] = dataNew;
    // @ts-ignore
    return update(ref(database), updates)
}*/

const updateAdd = ({userId, data}: IWriteProps): void => {

    const {sum, operationName, date, category} = data;

    const dateParts = date.split('/');
    const month = parseInt(dateParts[1], 10);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month - 1];
    const year = dateParts[2]

    const dataNew = {
        sum: sum,
        operationName: operationName,
        date: date,
        category: category,
    }

    const newPostKey = push(child(ref(database), 'spend')).key;
    const updates = {};
    // @ts-ignore
    updates[`users/${userId}/${year}/${monthName}/spend/${newPostKey}`] = dataNew;
    // @ts-ignore
    return update(ref(database), updates)
}


const getSpend = (userId: string): Promise<Record<string, IOperation> | number> => {
    return new Promise((resolve, reject) => {
        const spendRef = ref(database, `users/${userId}/spend/`);
        onValue(spendRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data);
            } else {
                resolve(0)
            }

        }, (error) => {
            reject(error);
        });
    });
};

export {getSpend, updateAdd};
