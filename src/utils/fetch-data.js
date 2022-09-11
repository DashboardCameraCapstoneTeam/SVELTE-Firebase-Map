/* eslint-disable no-console */
import axios from 'axios';

export const getDataWithAxios = async (sourceLink) => {
  const response = await axios.get(
    sourceLink,
  );
  return response.data;
};

export const getDataWithAxiosAndParams = async (sourceLink, payload) => {
  const response = await axios.get(
    sourceLink,
    {
      params: payload,
    },
  );
  return response.data;
};
