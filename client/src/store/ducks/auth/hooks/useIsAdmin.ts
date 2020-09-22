import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { Selectors } from '..';

const useIsAdmin = (): boolean | null => {
  return get(useSelector(Selectors.info), 'role') === 'ADMIN';
};

export default useIsAdmin;
