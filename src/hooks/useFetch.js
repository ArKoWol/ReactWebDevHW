import { useEffect, useState } from 'react';

export function useFetch(url, options = {}) {
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

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
					setError(err);
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

function logToLocalStorage(url, payload, status) {
	const logsKey = 'apiLogs';
	const prevLogs = JSON.parse(localStorage.getItem(logsKey)) || [];

	const newLog = {
		timestamp: new Date().toISOString(),
		url,
		payload: safeParse(payload),
		status,
	};

	const updatedLogs = [...prevLogs, newLog];
	localStorage.setItem(logsKey, JSON.stringify(updatedLogs));
}

function safeParse(data) {
	try {
		return typeof data === 'string' ? JSON.parse(data) : data;
	} catch {
		return data;
	}
}
