import { useHistory } from "react-router-dom";

import withParsedQuery from "./withParsedQuery";

export default ({ queryOptions } = {}) => {
  const { location, ...history } = useHistory();

  return {
    ...history,
    location: withParsedQuery(location, queryOptions)
  };
};
