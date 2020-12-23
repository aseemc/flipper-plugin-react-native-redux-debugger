export const formatTimestamp = (timestamp) => {
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliSeconds = time.getMilliseconds();

  return `${hours}:${minutes}:${seconds}.${milliSeconds}`;
}

export const validateJson = (value) => {
  try {
    const json = JSON.parse(value);
    if (Object.keys(json).length) return json;
  } catch (e) { }

  return null;
}