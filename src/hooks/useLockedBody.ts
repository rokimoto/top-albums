import { useEffect } from 'react';

export const useLockedBody = () => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflow = 'hidden';
    return () => {
      if (body) {
        body.style.overflow = 'visible';
      }
    };
  }, []);
};
