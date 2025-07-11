import { useState, useEffect } from "react";

const useSessionStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		const jsonValue = sessionStorage.getItem(key);

		if (jsonValue != null) return JSON.parse(jsonValue);

		return defaultValue;
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useSessionStorage;
