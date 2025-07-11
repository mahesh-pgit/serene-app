import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useBackgroundId } from "../../contexts/BackgroundIdContext";
import { useToasts } from "../../contexts/ToastsContext";
import AddBoard from "./AddBoard";
import { backgrounds } from "../../constants/backgrounds";
import { CROSS_SVG, DELETE_SVG } from "../../assets/SVGs";

const BoardSidebar = ({ activeBoard, setActiveBoard, isSidebarOpen, setIsSidebarOpen }) => {
	const { boards, setBoards } = useBoards();
	const [isDeletingAllBoards, setIsDeletingAllBoards] = useState(false);
	const [draggedBoardIndex, setDraggedBoardIndex] = useState(null);
	const { backgroundId } = useBackgroundId();
	const { showToast } = useToasts();

	const deleteRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (deleteRef.current && !deleteRef.current.contains(event.target)) {
				setIsDeletingAllBoards(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [boards.length]);

	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	const handleTouchStart = (e) => {
		touchStartX.current = e.changedTouches[0].screenX;
	};

	const handleTouchEnd = (e) => {
		touchEndX.current = e.changedTouches[0].screenX;
		handleSwipe();
	};

	const handleSwipe = () => {
		if (touchStartX.current - touchEndX.current > 50) {
			boards.length > 0 && setIsSidebarOpen(false);
		}
	};

	const handleDeleteAllBoards = () => {
		setBoards([]);
		setActiveBoard(null);
		setIsDeletingAllBoards(false);

		showToast("All boards deleted successfully", "success");
	};

	return (
		<aside
			className={`w-70 h-full flex flex-col ml-2 rounded-lg bg-white/15 ${
				backgrounds.find((background) => background.id === backgroundId)?.sidebarStyles
			} bg-cover bg-center max-md:fixed top-14 ${
				isSidebarOpen ? "max-md:translate-x-0 left-0" : "max-md:-translate-x-full -left-2"
			} max-md:w-[calc(100vw-1rem)] max-md:h-[calc(100vh-11rem)] max-md:mx-2 transition-transform duration-300 z-50`}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}>
			<div className="aside-header group py-3 px-4 flex justify-between items-center bg-white/10 rounded-t-lg">
				<h2 className="font-semibold">My Boards</h2>

				<div className="flex items-center gap-x-2">
					{boards.length > 0 && (
						<>
							<div className="relative flex items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
								<button
									className="w-6 h-6 cursor-pointer hover:text-red-500 z-1"
									onClick={() => {
										setIsDeletingAllBoards(!isDeletingAllBoards);
										!isDeletingAllBoards &&
											showToast(
												"Click confirm to delete all boards. This action can't be undone",
												"warning"
											);
									}}
									title="Delete all boards?">
									{DELETE_SVG}
								</button>

								{isDeletingAllBoards && (
									<button
										ref={deleteRef}
										className="absolute top-0 -left-16 tooltip-arrow-left text-xs bg-red-500 px-2 py-1 rounded-md outline-none cursor-pointer"
										onClick={handleDeleteAllBoards}
										title="Click to delete all boards. This cannot be undone.">
										Confirm
									</button>
								)}
							</div>

							<div className="md:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
								{CROSS_SVG}
							</div>
						</>
					)}
				</div>
			</div>

			<ul className="boards-list px-2 mt-2 overflow-y-auto custom-scrollbar scroll-smooth">
				{boards.map((board, index) => (
					<li
						key={board.id}
						className={`board-item py-2 px-3 mb-1 text-sm whitespace-nowrap overflow-hidden text-ellipsis rounded-md cursor-pointer ${
							board.id === activeBoard?.id && "bg-white/25"
						} hover:bg-white/40 transition-all duration-300 ease-in-out`}
						onClick={() => (setActiveBoard(board), setIsSidebarOpen(false))}
						draggable
						onDragStart={() => setDraggedBoardIndex(index)}
						onDragOver={(e) => {
							e.preventDefault();
							if (index !== draggedBoardIndex) {
								const newBoards = [...boards];
								const [movedBoard] = newBoards.splice(draggedBoardIndex, 1);
								newBoards.splice(index, 0, movedBoard);
								setBoards(newBoards);
								setDraggedBoardIndex(index);
							}
						}}
						onDragEnd={() => setDraggedBoardIndex(null)}
						title={board.name}>
						{board.name}
					</li>
				))}
			</ul>

			<AddBoard setActiveBoard={setActiveBoard} setIsSidebarOpen={setIsSidebarOpen} />
		</aside>
	);
};

export default BoardSidebar;
