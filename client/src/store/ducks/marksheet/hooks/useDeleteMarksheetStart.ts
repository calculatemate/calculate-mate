import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Creators } from '..';
import { DeleteParams } from '../../../../services/marksheet';
import { useUserId } from '../../auth/hooks';

const useDeleteMarksheetStart = () => {
  const dispatch = useDispatch();
  return useCallback(
    ({ id }: DeleteParams) => {
      if (id) {
        dispatch(Creators.deleteMarksheetStart({ id }));
      }
    },
    [dispatch],
  );
};

export default useDeleteMarksheetStart;
