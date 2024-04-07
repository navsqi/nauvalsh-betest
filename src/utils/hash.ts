import crypto from 'crypto';

export const md5 = str => {
  const hash = crypto.createHash('md5').update(str).digest('hex');
  return hash;
};
