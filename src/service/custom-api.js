import axios from 'axios';
import { MACHINE_LEARNING_PROCESS_URL, FETCH_GPS_DATA_URL, FETCH_AND_SAVE_GPS_DATA_URL } from '../constants';

export const processWithMachineLearning = async (user, videoFile, coordFile) => {
  try {
    const payload = {
      key: 1,
      user_id: `${user.uid}`,
      video_link: `https://drive.google.com/file/d/${videoFile.id}/view?usp=sharing`,
      coord_link: `https://drive.google.com/file/d/${coordFile.id}/view?usp=sharing`,
    };

    const promise = await axios({
      method: 'post',
      url: MACHINE_LEARNING_PROCESS_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(payload),
    });
    return promise;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    } if (error.request) {
      return error.request;
    }
    return error.message;
  }
};

export const fetchGPSDataFromGoogleDrive = async (user, coordFile) => {
  try {
    const data = JSON.stringify({
      user_id: `${user.uid}`,
      coord_link: `https://drive.google.com/file/d/${coordFile.id}/view?usp=sharing`,
    });

    const config = {
      method: 'post',
      url: FETCH_GPS_DATA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    const promise = await axios(config);
    return promise;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.status;
    } if (error.request) {
      return error.request;
    }
    return error.message;
  }
};

export const fetchAndSaveGPSDataFromGoogleDrive = async (user, coordFile) => {
  try {
    const data = JSON.stringify({
      user_id: `${user.uid}`,
      coord_link: `https://drive.google.com/file/d/${coordFile.id}/view?usp=sharing`,
    });

    const config = {
      method: 'post',
      url: FETCH_AND_SAVE_GPS_DATA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    };
    const promise = await axios(config);
    return promise;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.status;
    } if (error.request) {
      return error.request;
    }
    return error.message;
  }
};
