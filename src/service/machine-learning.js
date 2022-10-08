import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/process';
export const processWithMachineLearning = async (payload) => {
  const promise = await axios({
    method: 'post',
    url: baseUrl,
    data: payload,
  });
  return promise.data;
};
export default processWithMachineLearning;
