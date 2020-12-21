export const formatTimestamp = (timestamp) => {
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliSeconds = time.getMilliseconds();

  return `${hours}:${minutes}:${seconds}.${milliSeconds}`;
}

export const isJsonString = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}