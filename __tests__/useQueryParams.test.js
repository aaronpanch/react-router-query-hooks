import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import { useQueryParams } from "..";

const makeWrapper = history => ({ children }) => (
  <Router history={history}>{children}</Router>
);

describe("useHistoryWithQuery", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory({
      initialEntries: ["/path?one=1&two=value&arr=A&arr=B&arr=C"],
      initialIndex: 0
    });
  });

  it("allows query string customization", () => {
    const { result } = renderHook(
      () => useQueryParams({ parseNumbers: true }),
      { wrapper: makeWrapper(history) }
    );

    const [query] = result.current;

    expect(query).toEqual({
      one: 1,
      two: "value",
      arr: ["A", "B", "C"]
    });
  });

  it("updates query string", () => {
    const { result } = renderHook(
      () => useQueryParams({ parseNumbers: true }),
      { wrapper: makeWrapper(history) }
    );

    act(() => {
      result.current[1].replaceQuery({ one: 2, a: "B" });
    });

    expect(result.current[0]).toEqual({
      one: 2,
      a: "B"
    });
    expect(history.entries).toHaveLength(1);

    act(() => {
      result.current[1].pushQuery({ ...result.current[0], a: "A" });
    });

    expect(result.current[0]).toEqual({
      one: 2,
      a: "A"
    });
    expect(history.entries).toHaveLength(2);
  });
});
