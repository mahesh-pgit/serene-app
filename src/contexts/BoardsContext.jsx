import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BoardsContext = createContext(null);

const BoardsProvider = ({ children }) => {
	const [boards, setBoards] = useLocalStorage("serene-boards", []);

	return (
		<BoardsContext.Provider value={{ boards, setBoards }}>{children}</BoardsContext.Provider>
	);
};

const useBoards = () => useContext(BoardsContext);

export { BoardsProvider, useBoards };
