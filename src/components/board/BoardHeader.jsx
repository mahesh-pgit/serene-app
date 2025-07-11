import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useToasts } from "../../contexts/ToastsContext";
import { DELETE_SVG, MENU_SVG } from "../../assets/SVGs";

const BoardHeader = ({ activeBoard, setActiveBoard, setIsSidebarOpen }) => {
	const { boards, setBoards } = useBoards();
	const [isEditingBoardName, setIsEditingBoardName] = useState(false);
	const [boardName, setBoardName] = useState(activeBoard.name);
	const [isDeletingBoard, setIsDeletingBoard] = useState(false);
	const { showToast } = useToasts();

	useEffect(() => setBoardName(activeBoard.name), [activeBoard]);

	const deleteRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (deleteRef.current && !deleteRef.current.contains(event.target)) {
				setIsDeletingBoard(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleRenameBoard = () => {
		if (boardName === "") {
			showToast("Board Name cannot be empty, Please enter a proper name", "error");
			setBoardName(activeBoard.name);
			return;
		}

		if (!boardName.trim()) {
			showToast("Board Name cannot contain only spaces, Please enter a proper name", "error");
			setBoardName(activeBoard.name);
			return;
		}

		if (boardName === activeBoard.name) {
			setIsEditingBoardName(false);
			return;
		}

		const isDuplicate = boards.some(
			(board) => board.name.trim() === boardName.trim() && board.id !== activeBoard.id
		);
		if (isDuplicate) {
			showToast("Board Name already exists, Please enter a different name", "error");
			setBoardName(activeBoard.name);
			return;
		}

		setBoards((prev) =>
			prev.map((board) =>
				board.id === activeBoard.id ? { ...board, name: boardName } : board
			)
		);

		setActiveBoard({
			...activeBoard,
			name: boardName,
		});

		setIsEditingBoardName(false);

		showToast("Board name updated", "success");
	};

	const handleDeleteBoard = () => {
		const updatedBoards = boards.filter((board) => board.id !== activeBoard.id);

		setBoards(updatedBoards);
		setActiveBoard(updatedBoards.length ? updatedBoards[0] : null);
		setIsDeletingBoard(false);
		setIsSidebarOpen(true);

		showToast("Board deleted", "success");
	};

	return (
		<header className="group p-2.5 flex justify-center items-center gap-x-4 bg-white/10 rounded-t-lg relative">
			<div>
				{!isEditingBoardName ? (
					<h1
						className="text-lg font-semibold cursor-pointer"
						onClick={() => setIsEditingBoardName(true)}
						title="Click to edit">
						{activeBoard.name}
					</h1>
				) : (
					<input
						className="w-90 text-lg font-semibold outline-none border-black border-b-1 max-md:w-72"
						value={boardName}
						onChange={(e) => setBoardName(e.target.value)}
						onBlur={handleRenameBoard}
						onKeyDown={(e) => {
							e.key === "Enter" && handleRenameBoard();
							e.key === "Escape" &&
								(setBoardName(activeBoard.name), setIsEditingBoardName(false));
						}}
						maxLength={40}
						autoFocus
					/>
				)}
			</div>

			<div className="relative flex items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
				<button
					className="w-6.5 h-6.5 cursor-pointer hover:text-red-500 z-1"
					onClick={() => {
						setIsDeletingBoard(true);
						!isDeletingBoard &&
							showToast(
								"Click confirm to delete this board. This action can't be undone",
								"warning"
							);
					}}
					title="Delete board">
					{DELETE_SVG}
				</button>

				{isDeletingBoard && (
					<button
						ref={deleteRef}
						className="absolute top-0.5 left-7.5 tooltip-arrow-right text-xs bg-red-500 px-2 py-1 rounded-md outline-none cursor-pointer"
						onClick={handleDeleteBoard}
						title="Click to delete this board. This cannot be undone.">
						Confirm
					</button>
				)}
			</div>

			<div
				className="md:hidden absolute top-2 left-6 w-7 h-7"
				onClick={() => setIsSidebarOpen(true)}>
				{MENU_SVG}
			</div>
		</header>
	);
};

export default BoardHeader;
