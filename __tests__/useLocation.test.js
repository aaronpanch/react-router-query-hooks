import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { StaticRouter } from "react-router-dom";

import useLocation from "../src/useLocation";

const makeWrapper = location => ({ children }) => (
  <StaticRouter location={location}>{children}</StaticRouter>
);

describe("useLocation", () => {
  it("parses search query", () => {
    const wrapper = makeWrapper("/path?one=1&two=value&arr=A&arr=B&arr=C");

    const { result } = renderHook(() => useLocation(), { wrapper });

    expect(result.current.search).toBe("?one=1&two=value&arr=A&arr=B&arr=C");
    expect(result.current.query).toEqual({
      one: "1",
      two: "value",
      arr: ["A", "B", "C"]
    });
  });

  it("allows query string customization", () => {
    const wrapper = makeWrapper("/path?one=1&two=value");

    const { result } = renderHook(
      () => useLocation({ queryOptions: { parseNumbers: true } }),
      {
        wrapper
      }
    );

    expect(result.current.search).toBe("?one=1&two=value");
    expect(result.current.query).toEqual({
      one: 1,
      two: "value"
    });
  });
});
