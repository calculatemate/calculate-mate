import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Creators, LoginParams } from '..';

const useLoginStart = () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ username, password }: LoginParams) => {
      dispatch(Creators.loginStart({ username, password }));
    },
    [dispatch],
  );
};

export default useLoginStart;
