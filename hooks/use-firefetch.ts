import { useState, useEffect } from "react";
import { CollectionKey } from "@/lib/firestorePaths";


const useFirefetch = <T>(
  fn: (args: CollectionKey) => Promise<T>,
  args: CollectionKey
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const mutateData = (setter: T) => {
    setData(setter);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const result = await fn(args);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fn, args]); // refetch if function or any argument changes

  return { data, loading, error, mutateData };
};

export default useFirefetch;
