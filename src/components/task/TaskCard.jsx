import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useBackgroundId } from "../../contexts/BackgroundIdContext";
import { useToasts } from "../../contexts/ToastsContext";
import { DELETE_SVG, EDIT_SVG, TICK_SVG, CROSS_SVG } from "../../assets/SVGs";

function TaskCard({ task, listId, boardId, setDragData, onDropTask }) {
	const { boards, setBoards } = useBoards();
	const [isEditingTaskText, setIsEditingTaskText] = useState(false);
	const [taskText, setTaskText] = useState(task.text);
	const { backgroundId } = useBackgroundId();
	const { showToast } = useToasts();

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
	}, [taskText]);

	const handleUpdateTaskText = () => {
		if (taskText === "") {
			showToast("Task cannot be empty", "error");
			setIsEditingTaskText(false);
			setTaskText(task.text);
			return;
		}

		if (!taskText.trim()) {
			showToast("Task should contain atleast one character without spaces", "error");
			setIsEditingTaskText(false);
			setTaskText(task.text);
			return;
		}

		if (taskText === task.text) {
			setIsEditingTaskText(false);
			return;
		}

		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? {
						...board,
						lists: board.lists.map((list) =>
							list.id === listId
								? {
										...list,
										tasks: list.tasks.map((t) =>
											t.id === task.id ? { ...t, text: taskText } : t
										),
								  }
								: list
						),
				  }
				: board
		);

		setBoards(updatedBoards);
		setIsEditingTaskText(false);

		showToast("Task updated", "success");
	};

	const handleUpdateTaskStatus = () => {
		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? {
						...board,
						lists: board.lists.map((list) =>
							list.id === listId
								? {
										...list,
										tasks: list.tasks.map((t) =>
											t.id === task.id
												? { ...t, isCompleted: !t.isCompleted }
												: t
										),
								  }
								: list
						),
				  }
				: board
		);

		setBoards(updatedBoards);

		task.isCompleted
			? showToast("Task card marked as incomplete", "info")
			: showToast("Task card marked as complete", "info");
	};

	const handleDeleteTask = () => {
		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? {
						...board,
						lists: board.lists.map((list) =>
							list.id === listId
								? { ...list, tasks: list.tasks.filter((t) => t.id !== task.id) }
								: list
						),
				  }
				: board
		);

		setBoards(updatedBoards);

		showToast("Task deleted", "success");
	};

	return (
		<div
			className="task-card group relative p-2 rounded-md bg-black/20 bg-cover bg-center"
			draggable
			onDragStart={(e) => {
				e.stopPropagation();
				setDragData({ sourceListId: listId, taskId: task.id });
			}}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onDropTask(e, listId, task.id);
			}}>
			{!isEditingTaskText ? (
				<div className="flex justify-between">
					<div className="w-full flex gap-x-0.5">
						<div className="h-5 flex items-center">
							<button
								className={`w-4 h-4 text-black cursor-pointer ${
									task.isCompleted
										? "text-green-500"
										: "md:opacity-0 md:group-hover:opacity-100"
								}  transition-opacity duration-300 outline-none`}
								title={
									!task.isCompleted ? "Mark as completed" : "Mark as incomplete"
								}
								onClick={handleUpdateTaskStatus}>
								{TICK_SVG}
							</button>
						</div>

						<p
							className={`task w-55 text-sm overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap ${
								task.isCompleted
									? `${
											backgroundId === 1 ||
											backgroundId === 3 ||
											backgroundId === 4
												? "text-gray-300"
												: "text-gray-600"
									  } line-through max-md:w-62`
									: "max-md:w-56"
							}`}
							onDoubleClick={() => !task.isCompleted && setIsEditingTaskText(true)}>
							{task.text}
						</p>
					</div>

					<div className="absolute right-2 top-1.5 flex gap-x-0.5 p-0.5 rounded-md md:group-hover:bg-white/90 max-md:static max-md:p-0">
						<button
							className={`w-5 h-5 text-black hover:text-blue-500 cursor-pointer ${
								task.isCompleted
									? "hidden"
									: "md:opacity-0 md:group-hover:opacity-100"
							} transition-opacity duration-300`}
							title="Edit task"
							onClick={() => setIsEditingTaskText(true)}>
							{EDIT_SVG}
						</button>

						<button
							className="w-5 h-5 text-black hover:text-red-500 cursor-pointer md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
							title="Delete task"
							onClick={handleDeleteTask}>
							{DELETE_SVG}
						</button>
					</div>
				</div>
			) : (
				<div>
					<textarea
						ref={textareaRef}
						className="w-full max-h-40 overflow-y-hidden resize-none text-sm p-1.5 mb-2 rounded-md border border-gray-400 outline-none focus:border-black/80 custom-scrollbar scroll-smooth"
						value={taskText}
						placeholder="Edit task card"
						onFocus={(e) => e.target.select()}
						onChange={(e) => setTaskText(e.target.value)}
						onKeyDown={(e) => {
							e.key === "Enter" && (e.preventDefault(), handleUpdateTaskText());
							e.key === "Escape" && setIsEditingTaskText(false);
						}}
						onBlur={handleUpdateTaskText}
						autoFocus
					/>

					<div className="flex items-center gap-x-1">
						<button
							className="w-1/2 p-1.5 text-sm bg-sky-500 rounded-sm cursor-pointer hover:bg-sky-400"
							onClick={handleUpdateTaskText}>
							Save
						</button>

						<button
							className="p-2 rounded-sm cursor-pointer hover:bg-black/10"
							onClick={() => setIsEditingTaskText(false)}>
							{CROSS_SVG}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default TaskCard;
