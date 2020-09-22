import { useSelector } from 'react-redux';
import { Marksheet, Selectors } from '..';

const useMarksheetList = (): Marksheet[] => useSelector(Selectors.marksheets);

export default useMarksheetList;
