import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import { useHistoryWithQuery } from "..";

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

  it("reuses same instance", () => {
    const { result, rerender } = renderHook(() => useHistoryWithQuery(), {
      wrapper: makeWrapper(history)
    });

    const originalHistory = result.current;

    rerender();

    expect(result.current).toBe(originalHistory);
  });

  it("parses search query", () => {
    const { result } = renderHook(() => useHistoryWithQuery(), {
      wrapper: makeWrapper(history)
    });

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
    const { result } = renderHook(
      () => useHistoryWithQuery({ queryOptions: { parseNumbers: true } }),
      { wrapper: makeWrapper(history) }
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

  it("replaces url with query", () => {
    const { result } = renderHook(
      () => useHistoryWithQuery({ queryOptions: { parseNumbers: true } }),
      { wrapper: makeWrapper(history) }
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

    act(() => {
      result.current.replace({ query: { two: "stuff" } });
    });

    expect(history.location.search).toEqual("?two=stuff");
  });

  it("pushes url with query", () => {
    const { result } = renderHook(
      () => useHistoryWithQuery({ queryOptions: { parseNumbers: true } }),
      { wrapper: makeWrapper(history) }
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

    act(() => {
      result.current.push({ query: { two: "stuff" } });
    });

    expect(history.location.search).toEqual("?two=stuff");
  });

  it("pushes url with path", () => {
    const { result } = renderHook(
      () => useHistoryWithQuery({ queryOptions: { parseNumbers: true } }),
      { wrapper: makeWrapper(history) }
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

    act(() => {
      result.current.push("/path?two=stuff");
    });

    expect(history.location.search).toEqual("?two=stuff");
  });
});
