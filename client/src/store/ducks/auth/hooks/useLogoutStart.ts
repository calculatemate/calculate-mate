import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Creators } from '..';

const useLogoutStart = () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(Creators.logoutStart());
  }, [dispatch]);
};

export default useLogoutStart;
