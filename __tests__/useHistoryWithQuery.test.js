import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import useHistoryWithQuery from "../src/useHistoryWithQuery";

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

    expect(result.current.location.query).toEqual({
      two: "stuff"
    });
    expect(history.entries[0].search).toEqual("?two=stuff");
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

    expect(result.current.location.query).toEqual({
      two: "stuff"
    });
    expect(history.entries[1].search).toEqual("?two=stuff");
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

    expect(result.current.location.query).toEqual({
      two: "stuff"
    });
    expect(history.entries[1].search).toEqual("?two=stuff");
  });
});
