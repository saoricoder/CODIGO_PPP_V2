import React from 'react';

const useImageCache = () => {
  const [cache, setCache] = React.useState({});
  const [attemptCount, setAttemptCount] = React.useState({});

  const getImage = React.useCallback((url) => {
    if (cache[url]) {
      return cache[url];
    }

    if (attemptCount[url] >= 2) {
      return null; // Retorna null si ya se intentó cargar 2 veces
    }

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setCache(prevCache => ({
        ...prevCache,
        [url]: url
      }));
    };
    img.onerror = () => {
      setAttemptCount(prevCount => ({
        ...prevCount,
        [url]: (prevCount[url] || 0) + 1
      }));
    };

    return url;
  }, [cache, attemptCount]);

  return getImage;
};

export default useImageCache;