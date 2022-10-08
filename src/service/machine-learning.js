import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/process';
export const processWithMachineLearning = async () => {
  const promise = await axios({
    method: 'post',
    url: baseUrl,
    data: {
      key: 1,
      user_id: '0tk8sTPDuwR2WM7lFyUn4OxjGLr1',
      video_link: 'https://drive.google.com/file/d/1C2p3HuuBuzhuG8hkeMnEcKxhTOL5qbqg/view?usp=sharing',
      coord_link: 'https://drive.google.com/file/d/1qs5Wcj4haLuEoqDUMdEF4VidrdyaOyY7/view?usp=sharing',
    },
  });
  return promise.data;
};
export default processWithMachineLearning;
