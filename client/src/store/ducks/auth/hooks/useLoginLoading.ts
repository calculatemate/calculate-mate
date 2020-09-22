import { useSelector } from 'react-redux';
import { Selectors } from '..';

const useLoginLoading = (): boolean => useSelector(Selectors.loading);

export default useLoginLoading;
