import {
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import _ from 'lodash';

import mode from "./mode";

// ...

export function useDocumentTitle(title) {
  document.title = title;
}

// ...

export function useMode(stringArray) {
  const words = _.flatten(
    stringArray.reduce((words, word) => {
      return [...words, word.split(' ')];
    }, [])
  );

  return mode(words);
}

export function useMemoMode(stringArray) {
  return useMemo(
    () => {
      const words = _.flatten(
        stringArray.reduce((words, word) => {
          return [...words, word.split(' ')];
        }, [])
      );
    
      return mode(words);
    },
    [stringArray.length]
  );
}

export function useAsyncMode(stringArray) {
  const [mfw, setMfw] = useState(null);

  const ref = useRef();
  ref.current = stringArray;

  useEffect(() => {
    if (stringArray.length === 0) {
      return;
    }

    const words = _.flatten(
      ref.current.reduce((words, word) => {
        return [...words, word.split(' ')];
      }, [])
    );
  
    setMfw(mode(words));
  }, [stringArray.length]);

  return mfw;
}