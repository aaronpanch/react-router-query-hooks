import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import withParsedQuery from "./withParsedQuery";

const navigateWithQuery = (navigateMethod, options) => (location, state) => {
  typeof location === "object" && location.query
    ? navigateMethod({
        ...location,
        state,
        search: `?${queryString.stringify(location.query, options)}`
      })
    : navigateMethod(location, state);
};

export default ({ queryOptions } = {}) => {
  const history = useHistory();

  const historyWithQuery = useMemo(
    () =>
      Object.create(history, {
        location: {
          get: () => withParsedQuery(history.location, queryOptions)
        },
        push: {
          value: navigateWithQuery(history.push, queryOptions)
        },
        replace: {
          value: navigateWithQuery(history.replace, queryOptions)
        }
      }),
    [history, queryOptions]
  );

  return historyWithQuery;
};
