import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

export function Autocomplete(props) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }
    const search = autocomplete({
      container: '#auto-complete',
      renderer: { createElement, Fragment, render },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
