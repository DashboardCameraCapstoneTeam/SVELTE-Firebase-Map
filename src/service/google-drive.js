/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { getObjectsWhereKeyEqualsValue } from '../utils/filter-data';
import { GOOGLE_FOLDER_URL, GOOGLE_QUERY_URL, GOOGLE_FILE_URL } from '../constants';

export const getGoogleDriveFolders = async (accessToken) => {
  try {
    const config = {
      method: 'get',
      url: GOOGLE_FOLDER_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const promise = await axios(config);
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

export const getGoogleDriveFiles = async (accessToken, folderId) => {
  try {
    const customUrl = `${GOOGLE_QUERY_URL}'${folderId}'+in+parents&trashed=false&fields=files(*)`;
    const config = {
      method: 'get',
      url: customUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const promise = await axios(config);
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

export const verifyAndAddPermissions = async (accessToken, fileId) => {
  try {
    const url = `${GOOGLE_FILE_URL}/${fileId}/permissions`;
    const data = JSON.stringify({
      role: 'writer',
      type: 'anyone',
    });
    const config = {
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data,
    };
    const promise = await axios(config);
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

// Using the access token and file url, delete the file
export const deleteGoogleDriveFile = async (accessToken, fileId) => {
  try {
    const customUrl = `${GOOGLE_FILE_URL}/${fileId}`;
    const config = {
      method: 'delete',
      url: customUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const promise = await axios(config);
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

export const getGoogleDriveFile = async (accessToken, fileId) => {
  try {
    const customUrl = `${GOOGLE_FILE_URL}/${fileId}`;
    const config = {
      method: 'get',
      url: customUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };
    const promise = await axios(config);
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

export const createDashcamFolder = async (accessToken) => {
  try {
    const config = {
      method: 'POST',
      url: GOOGLE_FILE_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        mimeType: 'application/vnd.google-apps.folder',
        name: 'Dashcam',
      }),
    };

    const promise = await axios(config);
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

export const getDashcamVideos = async (accessToken) => {
  try {
    const response = await getGoogleDriveFolders(accessToken);
    if (response.status === 200) {
      const cameraFolder = getObjectsWhereKeyEqualsValue(response.data.files, 'name', 'Dashcam')[0];
      if (cameraFolder) {
        const documentsResponse = await getGoogleDriveFiles(accessToken, cameraFolder.id);
        return documentsResponse;
      }
      const createResponse = await createDashcamFolder(accessToken);
      if (createResponse === 200) {
        getDashcamVideos(accessToken);
      } else {
        return createResponse;
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getGoogleDriveFiles;
