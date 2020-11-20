import { useCallback } from "react";
import useLocationWithQuery from "./useLocationWithQuery";
import useHistoryWithQuery from "./useHistoryWithQuery";

const updateURL = (history, type, update) =>
  history[type]({
    query:
      typeof update === "function" ? update(history.location.query) : update
  });

export default queryOptions => {
  const location = useLocationWithQuery({ queryOptions });
  const history = useHistoryWithQuery({ queryOptions });

  const pushQuery = useCallback(update => updateURL(history, "push", update), [
    history
  ]);

  const replaceQuery = useCallback(
    update => updateURL(history, "replace", update),
    [history]
  );

  return [location.query, { pushQuery, replaceQuery }];
};
