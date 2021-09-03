export default function findFilterIndexInArray(filterArray, filterName) {
  return filterArray.findIndex((filter) => filter.filterName === filterName);
}
