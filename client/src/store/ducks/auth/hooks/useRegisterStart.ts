import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Creators, RegisterParams } from '..';

const useRegisterStart = () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ username, password, firstName, lastName }: RegisterParams) => {
      dispatch(Creators.registerStart({ username, password, firstName, lastName }));
    },
    [dispatch],
  );
};

export default useRegisterStart;
