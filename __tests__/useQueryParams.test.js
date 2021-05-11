import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import { useQueryParams } from "..";

const makeWrapper = history => ({ children }) => (
  <Router history={history}>{children}</Router>
);

describe("useQueryParams", () => {
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

  it("accepts functional query string update", () => {
    const { result } = renderHook(
      () => useQueryParams({ parseNumbers: true }),
      { wrapper: makeWrapper(history) }
    );

    act(() => {
      result.current[1].replaceQuery(query => ({ ...query, one: 2, a: "B" }));
    });

    expect(result.current[0]).toEqual({
      one: 2,
      two: "value",
      arr: ["A", "B", "C"],
      a: "B"
    });
    expect(history.entries).toHaveLength(1);

    act(() => {
      result.current[1].pushQuery(query => ({ ...query, a: "A" }));
    });

    expect(result.current[0]).toEqual({
      one: 2,
      two: "value",
      arr: ["A", "B", "C"],
      a: "A"
    });
    expect(history.entries).toHaveLength(2);
  });

  it("reuses parsed query if search string hasn't changed", () => {
    const options = { parseNumbers: true };
    const { result, rerender } = renderHook(() => useQueryParams(options), {
      wrapper: makeWrapper(history)
    });

    const [firstParsedQuery] = result.current;

    rerender();

    const [secondParsedQuery] = result.current;

    expect(secondParsedQuery).toBe(firstParsedQuery);
  });
});
