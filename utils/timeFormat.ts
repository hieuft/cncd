function twoDigit(x: number) {
  if (x < 10) {
    return "0" + x.toString();
  } else {
    return x.toString();
  }
}

function secondToMinuteAndSecond(s: number) {
  return twoDigit(Math.floor(s / 60)) + ":" + twoDigit(s % 60);
}

export { secondToMinuteAndSecond };
