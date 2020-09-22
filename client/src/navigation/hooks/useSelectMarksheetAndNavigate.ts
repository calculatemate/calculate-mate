import { useHistory } from 'react-router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Creators, Marksheet } from '../../store/ducks/marksheet';

const useSelectMarksheetAndNavigate = (route: string): ((marksheet: Marksheet) => void) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return useCallback(
    marksheet => {
      dispatch(Creators.selectMarksheet({ marksheet }));
      history.push(route);
    },
    [dispatch, history, route],
  );
};

export default useSelectMarksheetAndNavigate;
