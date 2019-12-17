import { useEffect } from 'react';

const useOutsideClick = (ref, flag, callback) => {
  const handleClickOutside = ({ target }) => {
    if (flag && ref.current && !ref.current.contains(target)) callback();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutsideClick;
