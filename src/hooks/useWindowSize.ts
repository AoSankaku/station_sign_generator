import { useLayoutEffect, useState } from 'react';

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      // 以下はスクロールバーの高さも返すため変更
      // setSize([window.innerWidth, window.innerHeight]);
      setSize([document.documentElement.clientWidth, document.documentElement.clientHeight]);
    };

    const observer = new MutationObserver(updateSize);
    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => {
      window.removeEventListener('resize', updateSize);
      observer.disconnect();
    };
  }, []);

  return size;
};

export default useWindowSize;
