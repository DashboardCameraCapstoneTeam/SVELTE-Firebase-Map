import axios from 'axios';

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

  const documentsUrl = `${baseUrl}'${folders[0].id}'+in+parents&trashed=false&fields=files(*)`;
  const documents = await getFiles(documentsUrl, token);
  return documents;
};

export default getFiles;
