/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { getObjectsWhereKeyEqualsValue } from '../utils/filter-data';

const queryUrl = 'https://www.googleapis.com/drive/v3/files?q=';
const fileBaseUrl = 'https://www.googleapis.com/drive/v3/files/';
export const getFiles = async (customUrl, token) => {
  const promise = await axios.get(customUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise.data.files;
};

export const deleteFile = async (customUrl, token) => {
  const promise = await axios.delete(customUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise;
};

export const getDashcamVideos = async (token) => {
  try {
    let allDocuments = [];
    const foldersUrl = `${queryUrl}mimeType='${'application/vnd.google-apps.folder'}'`;
    const folders = await getFiles(foldersUrl, token);

    const cameraFolder = getObjectsWhereKeyEqualsValue(folders, 'name', 'Dashcam')[0];
    const documentsUrl = `${queryUrl}'${cameraFolder.id}'+in+parents&trashed=false&fields=files(*)`;
    allDocuments = await getFiles(documentsUrl, token);
    return allDocuments;
  } catch (e) {
    return null;
  }
};

export const deleteDashcamVideo = async (token, fileId) => {
  try {
    const fileUrl = `${fileBaseUrl}${fileId}`;
    const result = await deleteFile(fileUrl, token);
    return result;
  } catch (e) {
    return null;
  }
};

export default getFiles;
