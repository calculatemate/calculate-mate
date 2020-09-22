import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Creators } from '..';
import { NewMarksheetParams } from '../../../../services/marksheet';
import { useUserId } from '../../auth/hooks';

const useSaveMarksheetStart = () => {
  const dispatch = useDispatch();
  const userId = useUserId();
  return useCallback(
    ({ rows, name, id }: Partial<NewMarksheetParams>) => {
      if (userId && rows && name) {
        dispatch(Creators.saveMarksheetStart({ rows, userId, name, id }));
      }
    },
    [dispatch, userId],
  );
};

export default useSaveMarksheetStart;
