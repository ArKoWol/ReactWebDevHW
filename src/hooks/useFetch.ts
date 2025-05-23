import { useEffect, useState } from 'react';

interface FetchOptions extends RequestInit {
  body?: string;
}

interface ApiLog {
  timestamp: string;
  url: string;
  payload: any;
  status: number | string;
}

interface FetchResult<T> {
  data: T | null;
  status: number | null;
  error: Error | null;
  loading: boolean;
}

export function useFetch<T>(url: string, options: FetchOptions = {}): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setStatus(response.status);
          logToLocalStorage(url, options.body, response.status);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          logToLocalStorage(url, options.body, 'FETCH_ERROR');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);

  return { data, status, error, loading };
}

function logToLocalStorage(url: string, payload: string | undefined, status: number | string): void {
  const logsKey = 'apiLogs';
  const prevLogs = JSON.parse(localStorage.getItem(logsKey) || '[]') as ApiLog[];

  const newLog: ApiLog = {
    timestamp: new Date().toISOString(),
    url,
    payload: safeParse(payload),
    status,
  };

  const updatedLogs = [...prevLogs, newLog];
  localStorage.setItem(logsKey, JSON.stringify(updatedLogs));
}

function safeParse(data: string | undefined): any {
  if (!data) return data;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
} 