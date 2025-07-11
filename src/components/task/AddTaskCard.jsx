import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useToasts } from "../../contexts/ToastsContext";
import { CROSS_SVG } from "../../assets/SVGs";

const AddTaskCard = ({ listId, boardId }) => {
	const { boards, setBoards } = useBoards();
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [newTaskText, setNewTaskText] = useState("");
	const { showToast } = useToasts();

	const addTaskRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (addTaskRef.current && !addTaskRef.current.contains(event.target)) {
				setIsAddingTask(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const textareaRef = useRef(null);

	useEffect(() => {
		if (textareaRef.current) {
			const textarea = textareaRef.current;

			textarea.style.height = "auto";

			const scrollHeight = textarea.scrollHeight;
			const maxHeight = parseInt(getComputedStyle(textarea).maxHeight);

			if (scrollHeight <= maxHeight) {
				textarea.style.overflowY = "hidden";
				textarea.style.height = `${scrollHeight}px`;
			} else {
				textarea.style.overflowY = "auto";
				textarea.style.height = `${maxHeight}px`;
			}
		}
	}, [newTaskText]);

	const handleAddTask = () => {
		if (newTaskText === "") {
			showToast("Task cannot be empty", "error");
			return;
		}

		if (!newTaskText.trim()) {
			showToast("Task should contain atleast one character without spaces", "error");
			setNewTaskText("");
			return;
		}

		const newtask = { id: Date.now().toString(), text: newTaskText, isCompleted: false };

		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? {
						...board,
						lists: board.lists.map((list) =>
							list.id === listId ? { ...list, tasks: [...list.tasks, newtask] } : list
						),
				  }
				: board
		);

		setBoards(updatedBoards);
		setNewTaskText("");

		showToast("Task added to list", "success");
	};

	return (
		<div className="pt-2">
			{!isAddingTask ? (
				<button
					className="w-full text-sm text-start px-3 py-2 bg-black/5 rounded-md cursor-pointer hover:bg-black/10"
					onClick={() => setIsAddingTask(true)}>
					+ Add a card
				</button>
			) : (
				<div ref={addTaskRef}>
					<textarea
						ref={textareaRef}
						className="w-full max-h-40 overflow-y-hidden resize-none text-sm p-1.5 mb-2 rounded-md border border-gray-400 outline-none focus:border-black/80 custom-scrollbar scroll-smooth"
						value={newTaskText}
						placeholder="New task card"
						onChange={(e) => setNewTaskText(e.target.value)}
						onKeyDown={(e) => {
							e.key === "Enter" && (e.preventDefault(), handleAddTask());
							e.key === "Escape" && setIsAddingTask(false);
						}}
						autoFocus
					/>

					<div className="flex items-center gap-x-1">
						<button
							className="w-1/2 p-1.5 text-sm bg-sky-500 rounded-sm cursor-pointer hover:bg-sky-400"
							onClick={handleAddTask}>
							Add card
						</button>

						<button
							className="p-2 rounded-sm cursor-pointer hover:bg-black/10"
							onClick={() => (setIsAddingTask(false), setNewTaskText(""))}>
							{CROSS_SVG}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddTaskCard;
