import { useEffect } from 'react';
import { useHasUser } from '../store/ducks/auth/hooks';
import { useNavigateToRoute } from '../navigation/hooks';
import ROUTES from '../navigation/routes';

const useAuthPages = () => {
  const hasUser = useHasUser();
  const navToIndex = useNavigateToRoute(ROUTES.INDEX);

  return useEffect(() => {
    if (hasUser) navToIndex();
  }, [hasUser, navToIndex]);
};

export default useAuthPages;
