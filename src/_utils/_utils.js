export const getReadableTime = dateTime => {
  const returnString = `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}, ${getTwoDigit(dateTime.getHours())}:${getTwoDigit(dateTime.getMinutes())}`;
  return returnString;
}
const getTwoDigit = num => {
  if (num > 9) return num
  else return `0${num}`
}