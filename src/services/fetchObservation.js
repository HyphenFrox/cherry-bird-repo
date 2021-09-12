import axios from "axios";

export default async function fetchObservation({ queryKey }) {
  const [, observationID] = queryKey;

  const { data: observationData } = await axios.get(
    `https://api.inaturalist.org/v1/observations/${observationID}`
  );

  if (observationData.total_results > 0) {
    return observationData;
  } else {
    throw new Error(`No Observation width the ID of ${observationID} found`);
  }
}
