export default function groupByYearSort(a, b) {
  // Extract semester and year from strings like "Spring 2023" or "Fall 2023"
  const [semesterA, yearA] = a[0].split(' ');
  const [semesterB, yearB] = b[0].split(' ');
  
  const yearNumA = parseInt(yearA);
  const yearNumB = parseInt(yearB);
  
  // First sort by year (newest first)
  if (yearNumA !== yearNumB) {
    return yearNumB - yearNumA;
  }
  
  // If same year, sort by semester (Fall comes after Spring chronologically)
  const semesterOrder = {
    'Spring': 1,
    'Fall': 2,
  };
  
  const orderA = semesterOrder[semesterA] || 0;
  const orderB = semesterOrder[semesterB] || 0;

  return orderB - orderA;
}
