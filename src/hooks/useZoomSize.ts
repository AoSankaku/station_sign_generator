import { useLayoutEffect, useState } from 'react';

const useZoomSize = (): number => {
  const [zoomLevel, setZoomLevel] = useState(1)
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setZoomLevel(window.devicePixelRatio);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return zoomLevel;
};

export default useZoomSize