import queryString from "query-string";

export default (location, options) => ({
  ...location,
  query: queryString.parse(location.search, options)
});
