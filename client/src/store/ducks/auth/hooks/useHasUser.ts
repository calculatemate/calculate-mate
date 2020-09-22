import { useSelector } from 'react-redux';
import { Selectors } from '..';

const useHasUser = (): string | null => useSelector(Selectors.token);

export default useHasUser;
