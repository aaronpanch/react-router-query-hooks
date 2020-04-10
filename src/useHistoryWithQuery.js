import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import withParsedQuery from "./withParsedQuery";

const wrapWithQuery = (navigate, options) => (location, state) =>
  typeof location === "object" && location.query
    ? navigate(
        { ...location, search: queryString.stringify(location.query, options) },
        state
      )
    : navigate(location, state);

export default ({ queryOptions } = {}) => {
  const history = useHistory();
  const { location, push, replace } = history;

  const pushWithQuery = useCallback(wrapWithQuery(push, queryOptions), [
    push,
    queryOptions
  ]);

  const replaceWithQuery = useCallback(wrapWithQuery(replace, queryOptions), [
    replace,
    queryOptions
  ]);

  return Object.assign(history, {
    location: withParsedQuery(location, queryOptions),
    push: pushWithQuery,
    replace: replaceWithQuery
  });
};
