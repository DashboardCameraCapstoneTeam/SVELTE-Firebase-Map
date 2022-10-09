/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { getObjectsWhereKeyEqualsValue } from '../utils/filter-data';
import { GOOGLE_QUERY_URL, GOOGLE_FILE_URL } from '../constants';

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
    const foldersUrl = `${GOOGLE_QUERY_URL}mimeType='${'application/vnd.google-apps.folder'}'`;
    const folders = await getFiles(foldersUrl, token);

    const cameraFolder = getObjectsWhereKeyEqualsValue(folders, 'name', 'Dashcam')[0];
    const documentsUrl = `${GOOGLE_QUERY_URL}'${cameraFolder.id}'+in+parents&trashed=false&fields=files(*)`;

    const allDocuments = await getFiles(documentsUrl, token);
    return allDocuments;
  } catch (e) {
    return null;
  }
};

export const deleteDashcamVideo = async (token, fileId) => {
  try {
    const fileUrl = `${GOOGLE_FILE_URL}${fileId}`;
    const result = await deleteFile(fileUrl, token);
    return result;
  } catch (e) {
    return null;
  }
};

export default getFiles;
