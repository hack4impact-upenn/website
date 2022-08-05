export default function groupByYearSort(a, b) {
  const yearA = parseInt(a[0].split(' ')[1]);
  const yearB = parseInt(b[0].split(' ')[1]);
  return yearB - yearA;
}
