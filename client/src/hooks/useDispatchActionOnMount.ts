import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

type UseDispatchAction = (action: Action) => void;

const useDispatchActionOnMount: UseDispatchAction = (action: Action) => {
  const dispatch = useDispatch();
  return useEffect(() => {
    dispatch(action);
  }, [dispatch, action]);
};

export default useDispatchActionOnMount;
