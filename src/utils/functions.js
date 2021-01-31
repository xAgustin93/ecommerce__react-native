export function sortArrayByDate(array) {
  return array.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
