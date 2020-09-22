import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { Creators } from '..';
import { useUserId } from '../../auth/hooks';

const useGetMarksheetStart = () => {
  const dispatch = useDispatch();
  const userId = useUserId();
  return useCallback(() => {
    if (userId) dispatch(Creators.getMarksheetStart({ userId }));
  }, [dispatch, userId]);
};

export const useGetMarksheetStartOnMount = () => {
  const get = useGetMarksheetStart();
  useEffect(() => {
    get();
  }, [get]);
};

export default useGetMarksheetStart;
