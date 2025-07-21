function generateRandomCode(n: number) {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";

  const allAvailableChars = upperCaseChars + numberChars;

  let generatedCode = "";
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * allAvailableChars.length);
    generatedCode += allAvailableChars[randomIndex];
  }

  return generatedCode;
}

export { generateRandomCode };
