import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => useMediaQuery({ query: '(max-width: 1224px)' });

export default useIsMobile;
