import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useToasts } from "../../contexts/ToastsContext";
import { CROSS_SVG } from "../../assets/SVGs";

const AddListColumn = ({ boardId }) => {
	const { boards, setBoards } = useBoards();
	const [isAddingList, setIsAddingList] = useState(false);
	const [newListName, setNewListName] = useState("");
	const { showToast } = useToasts();

	const addListRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (addListRef.current && !addListRef.current.contains(event.target)) {
				setIsAddingList(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleAddList = () => {
		if (newListName === "") {
			showToast("List name cannot be empty", "error");
			return;
		}
		if (!newListName.trim()) {
			showToast("List name should contain atleast one character without spaces", "error");
			setNewListName("");
			return;
		}

		const newList = {
			id: Date.now().toString(),
			name: newListName,
			tasks: [],
		};

		const updatedBoards = boards.map((board) =>
			board.id === boardId ? { ...board, lists: [...board.lists, newList] } : board
		);

		setBoards(updatedBoards);
		setNewListName("");

		showToast("List added to board", "success");
	};

	return (
		<div className="min-w-60 pr-3">
			{!isAddingList ? (
				<button
					className="w-full text-sm text-start px-3 py-2 bg-white/15 rounded-md cursor-pointer hover:bg-white/30"
					onClick={() => setIsAddingList(true)}>
					{boards.find((board) => board.id === boardId).lists.length > 0
						? "+ Add another list"
						: "+ Add a list"}
				</button>
			) : (
				<div ref={addListRef}>
					<input
						className="w-full text-sm p-1.5 mb-2 rounded-md border border-gray-400 outline-none focus:border-black/80"
						value={newListName}
						placeholder="New list name"
						onChange={(e) => setNewListName(e.target.value)}
						onKeyDown={(e) => {
							e.key === "Enter" && handleAddList();
							e.key === "Escape" && setIsAddingList(false);
						}}
						maxLength={28}
						autoFocus
					/>

					<div className="flex items-center gap-x-1">
						<button
							className="w-1/2 p-1.5 text-sm bg-sky-500 rounded-sm cursor-pointer hover:bg-sky-400"
							onClick={handleAddList}>
							Add list
						</button>

						<button
							className="p-2 rounded-sm cursor-pointer hover:bg-black/10"
							onClick={() => (setIsAddingList(false), setNewListName(""))}>
							{CROSS_SVG}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddListColumn;
