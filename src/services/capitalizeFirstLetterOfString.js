export default function capitalizeFirstLetterOfString(string) {
  const arr = string.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const result = arr.join(" ");

  return result;
}
