# React Router Hooks With Parsed Queries

A small package that augments the basic `react-router-dom` hooks (`useLocation` and `useHistory`) to be more query string aware by parsing using the `query-string` library.  In addition, it adds an simple `useQueryString` hook for soely query string manipulation (useful for UI where sort order, or page number is encoded in the URL).

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

### Augmenting `react-router-dom` Hooks:

#### Default locations:
```jsx
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
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

const MyComponent = () => {
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
