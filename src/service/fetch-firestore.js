import {
  collection, query, orderBy, doc, getDocs, where,
} from 'firebase/firestore';
import { db, firebase } from '../config/firebase';

export const fetchPotholeDataFromFirebase = async (user, dateTimeDictionary) => {
  try {
    const tempList = [];
    const docRef = doc(db, 'users', user.uid);
    const start = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.startDateTime));
    const end = firebase.firestore.Timestamp.fromDate(new Date(dateTimeDictionary.endDateTime));
    const colRef = query(collection(docRef, 'potholes'), where('date_time_analyzed', '>', start), where('date_time_analyzed', '<', end), orderBy('date_time_analyzed', 'desc'));
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((document) => {
      const potholeData = document.data();
      tempList.push(potholeData);
    });

    return tempList;
  } catch (e) {
    return null;
  }
};

export default fetchPotholeDataFromFirebase;
