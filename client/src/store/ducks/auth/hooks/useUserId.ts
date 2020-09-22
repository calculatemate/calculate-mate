import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { Selectors } from '..';

const useUserId = (): string | undefined => {
  return get(useSelector(Selectors.info), 'id');
};

export default useUserId;
