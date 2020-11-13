import { useEffect, useState } from "react";

export const useApiCall = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const localOptions = JSON.stringify(options);

  useEffect(() => {

    setLoading(true);
    fetch(url, JSON.parse(localOptions))
      .then(res => {
        if (res.ok)
          return res.json()
        else throw (res.status);
      })
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
    return () => {
    }
  }, [url, localOptions])

  return { data, error, loading };
}