function hashing(raw: string) {
  const base = 311;
  const mod = 1e9 + 9;

  let pow = 1;
  let ret = 0;

  for (let i = 0; i < raw.length; ++i) {
    ret = (ret + raw.charCodeAt(i) * pow) % mod;
    pow = pow * base;
  }

  return ret;
}

export { hashing };
