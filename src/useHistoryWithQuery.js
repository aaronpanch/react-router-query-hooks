import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import withParsedQuery from "./withParsedQuery";

const wrapWithQuery = (navigate, options) => (location, state) => {
  if (typeof location === "object" && location.query) {
    const search = queryString.stringify(location.query, options);
    navigate({ ...location, search }, state);
  } else {
    navigate(location, state);
  }
};

export default ({ queryOptions } = {}) => {
  const { location, push, replace, ...history } = useHistory();

  const pushWithQuery = useCallback(wrapWithQuery(push, queryOptions), [
    push,
    queryOptions
  ]);

  const replaeWithQuery = useCallback(wrapWithQuery(replace, queryOptions), [
    replace,
    queryOptions
  ]);

  return {
    ...history,
    location: withParsedQuery(location, queryOptions),
    push: pushWithQuery,
    replace: replaeWithQuery
  };
};
