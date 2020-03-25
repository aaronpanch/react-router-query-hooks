# React Router Hooks With Query String Parsing

![Test](https://github.com/aaronpanch/react-router-query-hooks/workflows/Test/badge.svg)

A small package that augments the basic `react-router-dom` hooks (`useLocation` and `useHistory`) to be more query string aware by parsing using the `query-string` library.

Primarily, it exports a simple `useQueryParams` hook for reading and manipulating the URL query string (useful for UIs where sort order, or page number is encoded in the URL). See the usage notes for more details.

Depends on:

- `react-router-dom@5.1` (needs hooks)
- `query-string`

This package is also written in ES6, so to use, you'll need some transpiler such as babel (on node_modules).

## How to Install

```bash
$ npm install react-router-query-hooks
```

or

```bash
$ yarn add react-router-query-hooks
```

## Basic Usage

There are two main uses for this package:

1. The higher-level `useQueryParams` hook.
2. The lower-level replacements for `useLocation` or `useHistory`: `useLocationWithQuery` and `useHistoryWithQuery`.

**Note:** With both usages, you'll need to have your components wrapped in a `Router` (any flavor exported by React Router should work).

### 1. The `useQueryParams` Hook

The easiest way to use this library is to use the higher-level `useQueryParams` hook. It's useful for reading or updating the current query parameters from the URL. Behind the scenes, it's basically a sweetened version of the `useHistoryWithQuery` hook outlined in the next section.

```jsx
import { useQueryParams } from "react-router-query-hooks";

const MyComponentInRouter = () => {
  const [query, { pushQuery, replaceQuery }] = useQueryParams();
};
```

The return value for the `useQueryParams` hook is similar to React's `useState`; however it includes _two_ setters instead of one: `pushQuery` and `replaceQuery`—to either add a history entry or replace the current history entry respectively. In the above example the first entry in the tuple (`query`) contains the parsed query parameters from the URL.

### 2. Augmented `useLocation` and `useHistory` hooks

If you want to use some more primitive hooks, the useQueryParams hook builds upon the two hooks that wrap the underlying React Router hooks ([useLocation](https://reacttraining.com/react-router/web/api/Hooks/uselocation), and [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)).

#### `useLocationWithQuery`

This modified hook adds the `query` key to React Router's [`location` object](https://reacttraining.com/react-router/web/api/location) which contains a parsed version of `location.search`. As with `useLocation` it is read-only (has no setters).

```jsx
import { useLocation } from "react-router-dom";
import { useLocationWithQuery } from "react-router-query-string";

const MyComponentInRouter = () => {
  // const location = useLocation();
  const location = useLocationWithQuery(); // Same interface as above but with location.query

  /* Augmented location object:
  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere',
    search: '?some=search-string',
    query: {
      some: "search-string"  // <- ADDED PROPERTY
    },
    hash: '#howdy',
    state: {
      [userDefined]: true
    }
  }
  */
};
```

#### `useHistoryWithQuery`

This modified hook builds upon React Router's [`history`](https://reacttraining.com/react-router/web/api/history) object and the above location additions:

- In `history.location`, it adds the `query` key to React Router's [`location` object](https://reacttraining.com/react-router/web/api/location) (as above)
- Furthermore, it supports URL updates with the `query` key. So `history.replace` supports both paths (as before) and location objects with the `query` key.

```jsx
import { useHistory } from "react-router-dom";
import { useLocationWithQuery } from "react-router-query-hooks";

const MyComponentInRouter = () => {
  // const history = useHistory();
  const history = useHistoryWithQuery();

  // Supports push & replace with of location.query (and existing API):
  return (
    <>
      <button onClick={() => history.replace({ query: { page: 1 } })}>
        Go to Page 1
      </button>
      <button onClick={() => history.push({ query: { page: 1 } })}>
        Go to Page 1
      </button>
    </>
  );
};
```

### Library Details

- None of the hooks shadow the URL state—everything is read from the URL.

## Fuller Example

The motivation for this package was to have an easy way to maintain URL query parameters, that was simple, somewhat light, and used the URL as the source of truth. Furthermore, it was designed to support UIs that have pagination:

```jsx
import { useQueryParams } from "react-router-query-hooks";

const MyComponentInRouter = () => {
  const [query, { replaceQuery }] = useQueryParams();
  const { page, sortBy, order } = query;

  // Useful for calling APIs with a page and sort order
  const { data } = useAPI("/my-resource", { page, sortBy, order });

  return (
    <div>
      <Table
        data={data}
        onHeaderClick={(sortBy, order) =>
          replaceQuery({ ...query, sortBy, order })
        }
      />
      <Pagination onClick={page => replaceQuery({ ...query, page })} />
    </div>
  );
};
```
