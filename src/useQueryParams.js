import { useCallback } from "react";
import useHistoryWithQuery from "./useHistoryWithQuery";

const updateURL = (history, type, update) =>
  history[type]({
    query:
      typeof update === "function" ? update(history.location.query) : update
  });

export default queryOptions => {
  const history = useHistoryWithQuery({ queryOptions });

  const pushQuery = useCallback(
    update => updateURL(history, "push", update),
    [history]
  );

  const replaceQuery = useCallback(
    update => updateURL(history, "replace", update),
    [history]
  );

  return [history.location.query, { pushQuery, replaceQuery }];
};
