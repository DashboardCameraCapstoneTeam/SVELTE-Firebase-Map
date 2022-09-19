import { auth, googleProvider } from '../config/firebase';

export const googleSignIn = async () => {
  let accessToken = null;
  await auth.signInWithPopup(googleProvider).then((result) => {
    accessToken = result.credential.accessToken;
  }).catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });

  return accessToken;
};
export default googleSignIn();
