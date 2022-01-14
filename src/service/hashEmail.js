import CryptoJS from 'crypto-js';

const hashEmail = (email) => {
  const ciphertext = CryptoJS.MD5(email);

  return ciphertext;
};

export default hashEmail;
