/* eslint-disable max-len */
import {
  collection, query, orderBy, doc, getDocs, where,
} from 'firebase/firestore';
import { db, firebase } from '../config/firebase';

export const fetchDataFromFirebase = async (user, dateTimeDictionary) => {
  try {
    const documentList = [];
    const docRef = doc(db, 'users', user.uid);

    let colRef = null;
    if (dateTimeDictionary.startDateTime === '' || dateTimeDictionary.endDateTime === '') {
      colRef = query(collection(docRef, 'geojson'));
    } else {
      const startDateTime = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.startDateTime));
      const endDateTime = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.endDateTime));
      colRef = query(collection(docRef, 'geojson'), where('dateTime', '>', startDateTime), where('dateTime', '<', endDateTime), orderBy('dateTime', 'desc'));
    }

    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((document) => {
      const data = document.data();
      data.dataId = document.id;
      documentList.push(data);
    });

    return { status: 200, documentList };
  } catch (error) {
    return error;
  }
};

export default fetchDataFromFirebase;
