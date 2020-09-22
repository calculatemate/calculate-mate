import { useSelector } from 'react-redux';
import { Marksheet, Selectors } from '..';

const useMarksheet = (): Marksheet | null => {
  return useSelector(Selectors.selected);
};

export default useMarksheet;
