import React, {
  useState
} from 'react';

import Feed from './Feed';
import Search from './Search';

// ...

const views = {
  Feed,
  Search
};

// ...

export default function Content() {
  const [view, setView] = useState('Feed');

  const View = views[view];
  const entries = Object.entries(views);

  return (
    <>
      <nav style={{ marginBottom: 50 }}>
        {entries.map(([key], index) => (
          <a
            key={key} 
            href 
            style={{ 
              cursor: 'pointer',
              color: key === view ? 'black' : 'gray'
            }} 
            onClick={() => setView(key)}>{key} {index !== entries.length -1 && ' | '}</a>
        ))}
      </nav>
      <View />
    </>
  )
}