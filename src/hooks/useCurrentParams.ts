import { useSearchParams } from 'react-router-dom';
import { SUPPORT_QUERY } from '../utils/constants';

export const useCurrentParams = () => {
  const [searchParams] = useSearchParams();

  const currentParams = JSON.parse(JSON.stringify(SUPPORT_QUERY)) as {
    [key: string]: string[];
  };

  searchParams.forEach((value, key) => {
    currentParams[key].push(value);
  });

  return [currentParams] as const;
};

export default useCurrentParams;
