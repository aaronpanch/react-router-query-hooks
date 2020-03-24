# React Router Hooks With Parsed Queries

![Test](https://github.com/aaronpanch/react-router-query-string/workflows/Test/badge.svg)

A small package that augments the basic `react-router-dom` hooks (`useLocation` and `useHistory`) to be more query string aware by parsing using the `query-string` library.

As an added bonus, you also get a simple `useQueryString` hook for query string manipulation (useful for UIs where sort order, or page number is encoded in the URL).  See the usage notes for more details.

## How to Install
```bash
$ npm install react-router-query-string
```
or 
```bash
$ yarn add react-router-query-string
```
## Basic Usage
There are two main uses for this package:

1. The higher-level `useQueryString` hook.
2. The lower-level replacements for `useLocation` or `useHistory`: `useLocationWithQuery` and `useHistoryWithQuery`.

**Note:** With both usages, you'll need to have your components wrapped in a `Router` (any flavor exported by React Router should work).

### 1. The `useQueryString` Hook
The easiest way to use this library is to use the higher-level `useQueryString` hook. It's useful for reading or updating the current query parameters from the URL.  Behind the scenes, it's basically is a sweetened version of the `useHistoryWithQuery` hook outlined in the next section.

```jsx
import { useQueryString } from 'react-router-query-string';

const MyComponentInRouter = () => {
  const [query, { pushQuery, replaceQuery }] = useQueryString();
}
```
The return value for the `useQueryString` hook is similar to React's `useState`; however it includes _two_ setters instead of one: `pushQuery` and `replaceQuery`—to either add a history entry or replace the current history entry respectively. In the above example the first entry in the tuple (`query`) contains the parsed query parameters from the URL.

### 2. Augmented default `react-router-dom` Hooks:
If you want to use some more primitive hooks, the useQueryString hook builds upon the two hooks that wrap the underlying React Router hooks ([useLocation](https://reacttraining.com/react-router/web/api/Hooks/uselocation), and [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory))

#### Using React Router's Hooks:
```jsx
import { useLocation } from 'react-router-dom';

const MyComponentInRouter = () => {
  const location = useLocation();
  
  /* Do things with location object:
  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere',
    search: '?some=search-string',
    hash: '#howdy',
    state: {
      [userDefined]: true
    }
  }
  */
}
```

#### Locations with query:
```jsx
import { useLocationWithQuery } from 'react-router-query-string';

const MyComponentInRouter = () => {
  const location = useLocationWithQuery();
  
  /* Do things with location object:
  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere',
    search: '?some=search-string',
    query: {
      some: "search-string"  // <- NEW PROPERTY
    },
    hash: '#howdy',
    state: {
      [userDefined]: true
    }
  }
  */
}
```

### Library Details

- None of the hooks shadow the URL state—everything is read from the URL.
