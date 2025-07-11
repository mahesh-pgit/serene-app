import { useState, useEffect } from "react";
import { useBoards } from "../contexts/BoardsContext";
import useSessionStorage from "../hooks/useSessionStorage";
import BoardSidebar from "../components/board/BoardSidebar";
import BoardHeader from "../components/board/BoardHeader";
import BoardContainer from "../components/board/BoardContainer";

const BoardLayout = () => {
	const { boards } = useBoards();
	const [activeBoard, setActiveBoard] = useSessionStorage("active-board", null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	useEffect(() => {
		if (!activeBoard && boards.length > 0) {
			setActiveBoard(boards[0]);
		}
	}, [boards, activeBoard]);

	return (
		<div className="board-layout w-screen h-[calc(100vh-7rem)] flex max-md:max-h-[calc(100vh-11rem)]">
			<BoardSidebar
				activeBoard={activeBoard}
				setActiveBoard={setActiveBoard}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>

			{activeBoard && (
				<main className="w-full h-full flex flex-col flex-1 mx-2 overflow-x-auto rounded-xl bg-white/15">
					<BoardHeader
						activeBoard={activeBoard}
						setActiveBoard={setActiveBoard}
						setIsSidebarOpen={setIsSidebarOpen}
					/>

					<BoardContainer activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
				</main>
			)}
		</div>
	);
};

export default BoardLayout;
