/* eslint-disable max-len */
import {
  collection, query, orderBy, doc, getDocs, where,
} from 'firebase/firestore';
import { db, firebase } from '../config/firebase';

export const fetchDataFromFirebase = async (user, dateTimeDictionary) => {
  try {
    const tempList = [];
    const docRef = doc(db, 'users', user.uid);
    const startDateTime = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.startDateTime));
    const endDateTime = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.endDateTime));
    const colRef = query(collection(docRef, 'potholes'), where('dateTime', '>', startDateTime), where('dateTime', '<', endDateTime), orderBy('dateTime', 'desc'));
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((document) => {
      const documentData = document.data();
      tempList.push(documentData);
    });

    return { status: 200, data: tempList };
  } catch (error) {
    return error;
  }
};

export default fetchDataFromFirebase;
