import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default ({ queryOptions } = {}) => {
  const location = useLocation();
  return {
    ...location,
    query: queryString.parse(location.search, queryOptions)
  };
};
