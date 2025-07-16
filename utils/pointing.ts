const pointPerReward = 5;

function handlePoint(point: number) {
  return {
    origin: point,
    reward: Math.floor(point / pointPerReward),
    remain: point % pointPerReward,
  };
}

export { handlePoint };
