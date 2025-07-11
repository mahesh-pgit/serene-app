import { createContext, useState, useRef, useContext } from "react";

const ToastsContext = createContext(null);

const ToastsProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const toastIdRef = useRef(0);

	const showToast = (message, type) => {
		const newToast = { id: toastIdRef.current++, message, type };

		setToasts((prevToasts) => [...prevToasts, newToast]);

		setTimeout(() => {
			setToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
		}, 5000);
	};

	return (
		<ToastsContext.Provider value={{ toasts, showToast }}>{children}</ToastsContext.Provider>
	);
};

const useToasts = () => useContext(ToastsContext);

export { ToastsProvider, useToasts };
