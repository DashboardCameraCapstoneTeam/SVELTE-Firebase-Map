/* eslint-disable import/prefer-default-export */
const convertFirestoreTimeStampToDateTime = (firestoreTimeStamp) => {
  const dateTime = new Date(firestoreTimeStamp.seconds * 1000);
  return dateTime;
};

export const convertDateTimeToString = (timeStamp) => {
  let dateTimeString = '';
  if (typeof timeStamp !== 'string') {
    const tempDateTime = convertFirestoreTimeStampToDateTime(timeStamp);
    dateTimeString = `${tempDateTime.getFullYear()}-${tempDateTime.getMonth() + 1}-${tempDateTime.getDate()} ${tempDateTime.getHours()}:${tempDateTime.getMinutes()}:${tempDateTime.getSeconds()}`;
  } else {
    dateTimeString = timeStamp;
  }

  return dateTimeString;
};
