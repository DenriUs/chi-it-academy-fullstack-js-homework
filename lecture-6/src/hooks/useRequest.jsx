import { useEffect, useState } from 'react';

import { sleep } from '@utils/helpers';

const useRequest = (fetcher, dependencies, delay = 0) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetcher();
        await sleep(delay);
        setData(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    })();
  }, [...dependencies]);

  return { data, isLoading, error };
};

export default useRequest;
