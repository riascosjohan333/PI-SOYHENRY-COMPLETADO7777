import {
  GET_COUNTRIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_DETAIL,
  GET_ACTIVITIES,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  FILTER_BY_CONTINENTS,
  FILTER_BY_ACTIVITIES,
  RESET_FILTERS,
} from "../actions/actionTypes";

const initialState = {
  countries: [],
  countryID: {},
  activities: [],
  allCountries: [],
  reset: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_COUNTRIES_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryID: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case ORDER_BY_NAME:
      const sortByName =
        action.payload === "A-Z"
          ? [...state.countries].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.countries].sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortByName,
      };
    case ORDER_BY_POPULATION:
      const sortByPopulation =
        action.payload === "min"
          ? [...state.countries].sort((a, b) => {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : [...state.countries].sort((a, b) => {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortByPopulation,
      };
    case FILTER_BY_CONTINENTS:
      const filterContinents =
        action.payload === "All"
          ? state.allCountries
          : state.allCountries.filter((c) => c.continent === action.payload);
      return {
        ...state,
        countries: filterContinents,
      };
    case FILTER_BY_ACTIVITIES:
      const filterActivities =
        action.payload === "All"
          ? state.allCountries
          : state.allCountries.filter((c) =>
              c.Activities.find((a) => a.name === action.payload)
            );
      return {
        ...state,
        countries: filterActivities,
      };
    case RESET_FILTERS:
      return {
        ...state,
        reset: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
