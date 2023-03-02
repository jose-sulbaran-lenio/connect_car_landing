import { useState, useEffect, useCallback } from "react";
import { instance } from "../../api";

// Custom hook to perform HTTP requests using axios library
export const useAxios = (options) => {
  // State to hold the data from the HTTP response
  const [data, setData] = useState(options?.initData || null);
  // State to keep track of loading status of the request
  const [loading, setLoading] = useState(options?.makeCall || false);
  // State to hold any error that occurs during the request
  const [error, setError] = useState(null);

  // Callback function to perform a custom HTTP request with specific options
  const call = useCallback(
    async (callOptions) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        // Perform the HTTP request using axios instance
        const response = await instance({
          method: callOptions?.method || options?.method || "get",
          url: callOptions?.url || options?.url,
          data: callOptions?.body || options?.body,
          params: callOptions?.params || options?.params,
          signal: callOptions?.signal,
        });
        // Set the data from the response, taking into account the response structure
        setData(!!response?.data?.data ? response.data.data : response.data);
      } catch (error) {
        // Only set error if the request was not cancelled
        if (error.name !== "CanceledError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.body, options?.method, options?.url, options?.onSuccess]
  );

  // Use useEffect to automatically make the HTTP request if makeCall option is set to true
  useEffect(() => {
    if (options?.makeCall) {
      const controller = new AbortController();
      const signal = controller.signal;

      call({
        signal,
      });

      // Clean up function to cancel the request if necessary
      return () => {
        controller.abort();
      };
    }

    return undefined;
  }, [options?.makeCall, call, options?.url]);

  // Return the data, loading, error, and call function as an object
  return { data, setData, loading, setLoading, error, call };
};
