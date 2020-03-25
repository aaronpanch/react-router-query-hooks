import { useCallback } from "react";
import useHistoryWithQuery from "./useHistoryWithQuery";

export default queryOptions => {
  const { location, push, replace } = useHistoryWithQuery({ queryOptions });
  const pushQuery = useCallback(query => push({ query }), [push]);
  const replaceQuery = useCallback(query => replace({ query }), [replace]);

  return [location.query, { pushQuery, replaceQuery }];
};
