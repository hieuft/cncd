const key0 = "$2b$11$kmJdnA8YQ2LT2ofzlIoSbO8fKM9Zr74Eg3sh0kSHz4P7Dr2HVB6zm";
const key1 = "$2b$11$kmJdnA8YQ2LT2ofzlIoSbO0yc8OoCS9uQscb9Ow.HacNCBB0CJB0O";
const key2 = "$2b$11$kmJdnA8YQ2LT2ofzlIoSbOJNkdu3dVYvhWhaaN4Whvnukg4/opcci";
const superKey = "$2b$11$kmJdnA8YQ2LT2ofzlIoSbOvttC9zKe3pqmxSz2wG//aBvxN2Hjs9S";
const salt = "$2b$11$kmJdnA8YQ2LT2ofzlIoSbO";
import { hashSync } from "bcrypt-ts";

function checkKey(key: string) {
  const hashedKey = hashSync(key, salt);
  if (hashedKey == key0) {
    return "hieu";
  }
  if (hashedKey == key1) {
    return "nam";
  }
  if (hashedKey == key2) {
    return "nhat";
  }
  return "";
}

function checkSuperKey(key: string) {
  const hashedKey = hashSync(key, salt);
  return hashedKey == superKey;
}

export { checkKey, checkSuperKey, salt };
