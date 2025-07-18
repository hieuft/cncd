function getCurrentHost() {
  const env = process.env.NODE_ENV;

  if (env == "development") {
    return "http://localhost:3000";
  } else if (env == "production") {
    return "https://cncd.vercel.app";
  }
}

export { getCurrentHost };
