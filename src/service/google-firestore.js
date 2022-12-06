/* eslint-disable max-len */
import {
  collection, query, orderBy, doc, getDocs, where, deleteDoc, setDoc,
} from 'firebase/firestore';
import { db, firebase } from '../config/firebase';

export const fetchDataFromFirebase = async (user, dateTimeDictionary) => {
  try {
    const data = [];
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
      const docData = document.data();
      docData.dataId = document.id;
      data.push(docData);
    });

    return { status: 200, data };
  } catch (error) {
    return error;
  }
};

export const uploadDocumentToFirebase = async (user, name, geoJson) => {
  try {
    const docRef = doc(db, 'users', user.uid);
    const colRef = collection(docRef, 'geojson');

    await setDoc(doc(colRef), geoJson);
    return { status: 200 };
  } catch (error) {
    return error;
  }
};

export const deleteDocumentFromFirebase = async (user, documentId) => {
  try {
    const docRef = doc(db, 'users', user.uid);
    const colRef = query(collection(docRef, 'geojson'));
    const querySnapshot = await getDocs(colRef);
    let isDocumentDeleted = false;
    querySnapshot.forEach((document) => {
      if (document.id === documentId) {
        deleteDoc(document.ref);
        isDocumentDeleted = true;
      }
    });
    if (isDocumentDeleted) {
      return { status: 200, message: 'Deleted Document' };
    }
    return { status: 400, message: 'Document does not exist' };
  } catch (error) {
    return error;
  }
};

export default fetchDataFromFirebase;
