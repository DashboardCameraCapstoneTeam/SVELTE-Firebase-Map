/* eslint-disable no-await-in-loop */
import axios from 'axios';
import { getObjectsWhereKeyEqualsValue } from '../utils/filter-data';

const baseUrl = 'https://www.googleapis.com/drive/v3/files?q=';
export const getFiles = async (customUrl, token) => {
  const promise = await axios.get(customUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return promise.data.files;
};

export const getFilesByFolder = async (token) => {
  const foldersUrl = `${baseUrl}mimeType='${'application/vnd.google-apps.folder'}'`;
  const folders = await getFiles(foldersUrl, token);

  const cameraFolder = getObjectsWhereKeyEqualsValue(folders, 'name', 'Dashcam')[0];
  const documentsUrl = `${baseUrl}'${cameraFolder.id}'+in+parents&trashed=false&fields=files(*)`;
  const innerFolders = await getFiles(documentsUrl, token);

  const allDocuments = [];
  for (let i = 0; i < innerFolders.length; i += 1) {
    const innerUrl = `${baseUrl}'${innerFolders[i].id}'+in+parents&trashed=false&fields=files(*)`;
    const innerDocuments = await getFiles(innerUrl, token);
    allDocuments.push(...innerDocuments);
  }

  return allDocuments;
};

export default getFiles;
