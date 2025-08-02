import { trim } from "./convert";

function containsAnyExcept(str: string, char: string) {
  const regex = new RegExp(`[^${char}]`); // Create a regex that matches any character EXCEPT 'char'
  return regex.test(str);
}

function isAccept(ans: string, user: string) {
  ans = trim(ans.toLowerCase());
  user = trim(user.toLowerCase());

  // console.log(ans, user);
  if (ans.includes("[]")) {
    const x = ans.split("[]");
    if (x.includes(user)) {
      return true;
    }
  } else {
    if (ans == user) {
      return true;
    }
  }
  return false;
}

export { containsAnyExcept, isAccept };
