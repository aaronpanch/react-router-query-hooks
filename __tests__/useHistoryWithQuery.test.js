import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import useHistoryWithQuery from "../src/useHistoryWithQuery";

const makeWrapper = history => ({ children }) => (
  <Router history={history}>{children}</Router>
);

describe("useHistoryWithQuery", () => {
  it("parses search query", () => {
    const history = createMemoryHistory({
      initialEntries: ["/path?one=1&two=value&arr=A&arr=B&arr=C"],
      initialIndex: 0
    });
    const wrapper = makeWrapper(history);

    const { result } = renderHook(() => useHistoryWithQuery(), { wrapper });

    expect(result.current.location.pathname).toBe("/path");
    expect(result.current.location.search).toBe(
      "?one=1&two=value&arr=A&arr=B&arr=C"
    );
    expect(result.current.location.query).toEqual({
      one: "1",
      two: "value",
      arr: ["A", "B", "C"]
    });
  });

  it("allows query string customization", () => {
    const history = createMemoryHistory({
      initialEntries: ["/path?one=1&two=value&arr=A&arr=B&arr=C"],
      initialIndex: 0
    });
    const wrapper = makeWrapper(history);

    const { result } = renderHook(
      () => useHistoryWithQuery({ queryOptions: { parseNumbers: true } }),
      { wrapper }
    );

    expect(result.current.location.pathname).toBe("/path");
    expect(result.current.location.search).toBe(
      "?one=1&two=value&arr=A&arr=B&arr=C"
    );
    expect(result.current.location.query).toEqual({
      one: 1,
      two: "value",
      arr: ["A", "B", "C"]
    });
  });
});
