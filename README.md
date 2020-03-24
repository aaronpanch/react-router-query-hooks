# React Router Hooks With Parsed Queries

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

1. As a drop-in replacement for `useLocation` or `useHistory` (with a name change) or,
2. By itself, with `useQueryString` (for query-only changes).

**Note:** With both usages, you'll need to have your components wrapped in a `Router` (Any kind of router will do).

### 1. Augmenting default `react-router-dom` Hooks:

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

### 2. `useQueryString` Hook
Another way to use this library is to use the higher-level `useQueryString` hook. It basically is a sweetened version of the `useHistoryWithQuery` hook.

```jsx
import { useQueryString } from 'react-router-query-string';

const MyComponentInRouter = () => {
  const [query, {pushQuery, replaceQuery}] = useQueryString();
}
```

The return value for the `useQueryString` hook is similar to React's `useState`; however it includes two setters instead of one: `pushQuery` and `replaceQuery` to either add a history entry or replace the current history entry.  The first entry in the tuple, is the parsed query string as an object.

### Library Details

- None of the hooks shadow the URL state—everything is read from the URL.
