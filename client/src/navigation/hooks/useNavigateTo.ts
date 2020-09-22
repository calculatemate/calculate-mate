import { useHistory } from 'react-router';
import { useCallback } from 'react';

const useNavigateToRoute = (route: string): ((params?: Record<string, any>) => void) => {
  const history = useHistory();
  return useCallback(() => {
    history.push(route);
  }, [history, route]);
};

export default useNavigateToRoute;
