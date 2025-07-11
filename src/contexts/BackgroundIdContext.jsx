import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BackgroundIdContext = createContext(null);

const BackgroundIdProvider = ({ children }) => {
	const [backgroundId, setBackgroundId] = useLocalStorage("backgroundId", 1);

	return (
		<BackgroundIdContext.Provider value={{ backgroundId, setBackgroundId }}>
			{children}
		</BackgroundIdContext.Provider>
	);
};

const useBackgroundId = () => useContext(BackgroundIdContext);

export { BackgroundIdProvider, useBackgroundId };
