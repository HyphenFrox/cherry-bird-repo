import axios from "axios";
import { dateViewLabelToValue } from "./dateViewConversion";

export default async function fetchObservations({ queryKey }) {
  const [, filterState] = queryKey;
  let url = `https://api.inaturalist.org/v1/observations?`;

  for (const filter of filterState) {
    if (filter.elementType === "select" && filter.selected) {
      url += `${filter.filterName}=${filter.selected}&`;
    }

    if (filter.elementType === "multiSelect" && filter.selected.length > 0) {
      url += `${filter.filterName}=${filter.selected}&`;
    }

    if (
      filter.elementType === "locationSelect" &&
      (filter.selected ?? false) &&
      Object.entries(filter.selected).length > 0
    ) {
      const coordinates =
        filter?.selected?.bounding_box_geojson?.coordinates[0];

      url += `nelat=${coordinates[1][1] || coordinates[2][1]}&nelng=${
        coordinates[2][0] || coordinates[3][0]
      }&swlat=${
        coordinates[0][1] || coordinates[3][1] || coordinates[4][1]
      }&swlng=${coordinates[0][0] || coordinates[1][0] || coordinates[4][0]}&`;
    }

    if (filter.elementType === "pagination") {
      if (filter.filterName === "page") url += `page=${filter.selected + 1}&`;
      else url += `${filter.filterName}=${filter.selected}&`;
    }

    if (
      filter.elementType === "dateView" &&
      filter.selected !== dateViewLabelToValue("all time")
    ) {
      const currentDate = new Date();
      if (filter.selected === dateViewLabelToValue("daily")) {
        url += `day=${currentDate.getDate()}&month=${
          currentDate.getMonth() + 1
        }&year=${currentDate.getFullYear()}&`;
      }
      if (filter.selected === dateViewLabelToValue("monthly")) {
        url += `month=${
          currentDate.getMonth() + 1
        }&year=${currentDate.getFullYear()}&`;
      }
      if (filter.selected === dateViewLabelToValue("yearly")) {
        url += `year=${currentDate.getFullYear()}&`;
      }
    }
  }

  url = encodeURI(url);

  if (process.env.NODE_ENV === "development") console.log(url);

  const { data: observationResults } = await axios.get(url);

  return observationResults;
}
