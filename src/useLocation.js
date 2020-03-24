import { useLocation } from "react-router-dom";

import withParsedQuery from "./withParsedQuery";

export default ({ queryOptions } = {}) => {
  const location = useLocation();
  return withParsedQuery(location, queryOptions);
};
