import { dateViewLabelToValue } from "./dateViewConversion";

const filterDetails = [
  {
    filterName: "captive",
    filterFriendlyName: "Captive",
    elementType: "select",
    selected: "",
    options: ["Default", "Captive", "Non-Captive"],
  },
  {
    filterName: "endemic",
    filterFriendlyName: "Endemic",
    elementType: "select",
    selected: "",
    options: ["Default", "Endemic", "Non-Endemic"],
  },
  {
    filterName: "native",
    filterFriendlyName: "Native",
    elementType: "select",
    selected: "",
    options: ["Default", "Native", "Non-Native"],
  },
  {
    filterName: "threatened",
    filterFriendlyName: "Threatened",
    elementType: "select",
    selected: "",
    options: ["Default", "Threatened", "Non-Threatened"],
  },
  {
    filterName: "popular",
    filterFriendlyName: "Popular",
    elementType: "select",
    selected: "",
    options: ["Default", "Popular", "Non-Popular"],
  },
  {
    filterName: "photos",
    filterFriendlyName: "With Photos",
    elementType: "select",
    selected: "",
    options: ["Default", "True", "False"],
  },
  {
    filterName: "quality_grade",
    filterFriendlyName: "Quality Grade",
    elementType: "select",
    selected: "research",
    options: ["Default", "Casual", "Needs ID", "Research"],
  },
  {
    filterName: "order",
    filterFriendlyName: "Order",
    elementType: "select",
    selected: "desc",
    options: ["Desc", "Asc"],
  },
  {
    filterName: "order_by",
    filterFriendlyName: "Order By",
    elementType: "select",
    selected: "created at",
    options: ["Observed On", "Species Guess", "Votes", "ID", "Created At"],
  },
  {
    filterName: "iconic_taxa",
    filterFriendlyName: "Taxonomy",
    elementType: "multiSelect",
    selected: [],
    options: [
      "Actinopterygii",
      "Animalia",
      "Amphibia",
      "Arachnida",
      "Aves",
      "Chromista",
      "Fungi",
      "Insecta",
      "Mammalia",
      "Mollusca",
      "Reptilia",
      "Plantae",
      "Protozoa",
      "Unknown",
    ],
  },
  {
    filterName: "rank",
    filterFriendlyName: "Rank",
    elementType: "multiSelect",
    selected: [],
    options: [
      "Kingdom",
      "Phylum",
      "Subphylum",
      "Superclass",
      "Class",
      "Subclass",
      "Superorder",
      "Order",
      "Suborder",
      "Infraorder",
      "Superfamily",
      "Epifamily",
      "Family",
      "Subfamily",
      "Supertribe",
      "Tribe",
      "Subtribe",
      "Genus",
      "Genushybrid",
      "Species",
      "Hybrid",
      "Subspecies",
      "Variety",
      "Form",
    ],
  },
  {
    filterName: "location",
    filterFriendlyName: "Location",
    elementType: "locationSelect",
    selected: null,
  },
  {
    filterName: "per_page",
    filterFriendlyName: "Items Per Page",
    elementType: "pagination",
    selected: 25,
  },
  {
    filterName: "page",
    filterFriendlyName: "Page No.",
    elementType: "pagination",
    selected: 0,
  },
  {
    filterName: "dateView",
    filterFriendlyName: "Date View",
    elementType: "dateView",
    selected: dateViewLabelToValue("all time"),
  },
  {
    filterName: "isNearbyOn",
    elementType: "nearby",
    selected: false,
  },
  {
    filterName: "lat",
    filterFriendlyName: "Latitude",
    elementType: "string",
    selected: "",
  },
  {
    filterName: "lng",
    filterFriendlyName: "Longitude",
    elementType: "string",
    selected: "",
  },
  {
    filterName: "radius",
    filterFriendlyName: "Radius",
    elementType: "nearbyRadius",
    selected: 25,
  },
];

export { filterDetails };
