import { useSelector } from 'react-redux';
import { Selectors } from '..';

const useMarksheetLoading = (): boolean => useSelector(Selectors.loading);

export default useMarksheetLoading;
