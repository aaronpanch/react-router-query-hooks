import { useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import useHistoryWithQuery from "./useHistoryWithQuery";

const updateURL = (history, type, update) =>
  history[type]({
    query:
      typeof update === "function" ? update(history.location.query) : update
  });

export default queryOptions => {
  const { search } = useLocation();
  const history = useHistoryWithQuery({ queryOptions });

  const query = useMemo(() => queryString.parse(search, queryOptions), [
    search,
    queryOptions
  ]);

  const pushQuery = useCallback(update => updateURL(history, "push", update), [
    history
  ]);

  const replaceQuery = useCallback(
    update => updateURL(history, "replace", update),
    [history]
  );

  return [query, { pushQuery, replaceQuery }];
};
