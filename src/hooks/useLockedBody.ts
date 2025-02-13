import { useEffect } from 'react';

/**
 * Hook to lock body on mount and unlock on dismount
 */
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
