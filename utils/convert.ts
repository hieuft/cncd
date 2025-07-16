function arrayToArrayWithKey(oldArr: Array<any>) {
  const len = oldArr.length;
  let newArr: Object[] = [];
  for (let i = 0; i < len; ++i) {
    newArr.push({ key: i, body: oldArr[i] });
  }
  return newArr;
}

function arrayWithKeyToArray(oldArr: Array<any>) {
  const len = oldArr.length;
  let newArr: any[] = [];
  for (let i = 0; i < len; ++i) {
    newArr.push(oldArr[i].body);
  }
  return newArr;
}

export { arrayToArrayWithKey, arrayWithKeyToArray };
