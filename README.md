# React Router Hooks With Parsed Queries

![Test](https://github.com/aaronpanch/react-router-query-hooks/workflows/Test/badge.svg)

A small package that augments the basic `react-router-dom` hooks (`useLocation` and `useHistory`) to be more query string aware by parsing using the `query-string` library.

As an added bonus, you also get a simple `useQueryString` hook for query string manipulation (useful for UIs where sort order, or page number is encoded in the URL).  See the usage notes for more details.

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

1. The higher-level `useQueryString` hook.
2. The lower-level replacements for `useLocation` or `useHistory`: `useLocationWithQuery` and `useHistoryWithQuery`.

**Note:** With both usages, you'll need to have your components wrapped in a `Router` (any flavor exported by React Router should work).

### 1. The `useQueryString` Hook
The easiest way to use this library is to use the higher-level `useQueryString` hook. It's useful for reading or updating the current query parameters from the URL.  Behind the scenes, it's basically a sweetened version of the `useHistoryWithQuery` hook outlined in the next section.

```jsx
import { useQueryString } from 'react-router-query-hooks';

const MyComponentInRouter = () => {
  const [query, { pushQuery, replaceQuery }] = useQueryString();
}
```
The return value for the `useQueryString` hook is similar to React's `useState`; however it includes _two_ setters instead of one: `pushQuery` and `replaceQuery`—to either add a history entry or replace the current history entry respectively. In the above example the first entry in the tuple (`query`) contains the parsed query parameters from the URL.


### 2. Augmented `useLocation` and `useHistory` hooks
If you want to use some more primitive hooks, the useQueryString hook builds upon the two hooks that wrap the underlying React Router hooks ([useLocation](https://reacttraining.com/react-router/web/api/Hooks/uselocation), and [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)).

#### `useLocationWithQuery`
This modified hook adds the `query` key to React Router's [`location` object](https://reacttraining.com/react-router/web/api/location) which contains a parsed version of `location.search`.  As with `useLocation` it is read-only (has no setters).

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
}
```

#### `useHistoryWithQuery`
This modified hook builds upon React Router's [`history`](https://reacttraining.com/react-router/web/api/history) object and the above location additions:
- In `history.location`, it adds the `query` key to React Router's [`location` object](https://reacttraining.com/react-router/web/api/location) (as above)
- Furthermore, it supports URL updates with the `query` key. So `history.replace` supports both paths (as before) and location objects with the `query` key.
```jsx
import { useHistory } from "react-router-dom"
import { useLocationWithQuery } from 'react-router-query-hooks';

const MyComponentInRouter = () => {
  // const history = useHistory();
  const history = useHistoryWithQuery();
  
  // Supports push & replace with of location.query (and existing API):
  return (
    <>
      <button onClick={() => history.replace({ query: { page: 1 }})}>Go to Page 1</button>
      <button onClick={() => history.push({ query: { page: 1 }})}>Go to Page 1</button>
    </>
  );
}
```

### Library Details

- None of the hooks shadow the URL state—everything is read from the URL.
