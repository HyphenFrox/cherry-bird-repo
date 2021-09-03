import axios from "axios";

export default async function fetchLocationInfo({ queryKey }) {
  let [, query] = queryKey;
  if (query) {
    let url = `https://api.inaturalist.org/v1/places/autocomplete?q=${query}&per_page=200&`;
    url = encodeURI(url);

    const { data } = await axios.get(url);

    const { results: locationResults } = data;
    return locationResults;
  } else {
    return [];
  }
}
