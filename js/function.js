function generateRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const generateRandomString = () => {
  const rand = Math.random().toString(36).substring(2, 15);
  return rand;
};
