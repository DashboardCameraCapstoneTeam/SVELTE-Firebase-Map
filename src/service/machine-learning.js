import axios from 'axios';
import { MACHINE_LEARNING_PROCESS_URL } from '../constants';

export const processWithMachineLearning = async (payload) => {
  const promise = await axios({
    method: 'post',
    url: MACHINE_LEARNING_PROCESS_URL,
    data: payload,
  });
  return promise.data;
};
export default processWithMachineLearning;
