import {
  collection, query, orderBy, doc, getDocs,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchPotholeDataFromFirebase = async (user) => {
  try {
    const tempList = [];
    const docRef = doc(db, 'users', user.uid);
    const colRef = query(collection(docRef, 'potholes'), orderBy('date_time_analyzed', 'desc'));
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
