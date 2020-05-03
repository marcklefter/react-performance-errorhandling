import React, {
  useCallback,
  useRef,
  useState
} from 'react';

import _ from 'lodash';

import AppError from '../AppError';
import ErrorHandler from '../ErrorHandler';

// ...

const QueryFail = 'fail';

function SearchFallback() {
  return 'A search error occurred';
}

function SearchEngine({ query }) {
  if (!query) {
    return null;
  }

  if (query.toLowerCase() === QueryFail) {
    throw new AppError('Search failed for query "' + query + '"');
  }

  return `Search: ${query}`;
}

export default function Search() {
  const [query, setQuery] = useState('');

  const debouncedSetQuery = useCallback(
    _.debounce(
      value => setQuery(value),
      400
    ),
    []
  );

  const inputRef = useRef();
    
  return (
    <div>
      <input 
        ref={inputRef}
        placeholder="Search"
        onChange={() => debouncedSetQuery(inputRef.current.value)}
      />

      <div style={{
        marginTop: 50
      }}>
        <ErrorHandler fallback={SearchFallback}>
          <SearchEngine query={query} />
        </ErrorHandler>
      </div>
    </div>
  )
}