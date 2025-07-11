import { useState } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useToasts } from "../../contexts/ToastsContext";
import TaskCard from "../task/TaskCard";
import AddTaskCard from "../task/AddTaskCard";
import { DELETE_SVG } from "../../assets/SVGs";

const ListColumn = ({
	list,
	boardId,
	listIndex,
	dragData,
	setDragData,
	onDropTask,
	onDropList,
}) => {
	const { boards, setBoards } = useBoards();
	const [isEditingListName, setIsEditingListName] = useState(false);
	const [listName, setListName] = useState(list.name);
	const { showToast } = useToasts();

	const handleRenameList = () => {
		if (listName === "") {
			showToast("List name cannot be empty", "error");
			setListName(list.name);
			setIsEditingListName(false);
			return;
		}

		if (!listName.trim()) {
			showToast("List name should contain atleast one character without spaces", "error");
			setListName(list.name);
			setIsEditingListName(false);
			return;
		}

		if (listName === list.name) {
			setIsEditingListName(false);
			return;
		}

		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? {
						...board,
						lists: board.lists.map((l) =>
							l.id === list.id ? { ...l, name: listName } : l
						),
				  }
				: board
		);

		setBoards(updatedBoards);
		setIsEditingListName(false);

		showToast("List name updated", "success");
	};

	const handleDeleteList = () => {
		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? { ...board, lists: board.lists.filter((l) => l.id !== list.id) }
				: board
		);

		setBoards(updatedBoards);

		showToast("List deleted", "success");
	};

	return (
		<div
			className="list-column min-w-68 max-h-[calc(100vh-12.5rem)] p-2 flex flex-col bg-white/30 rounded-lg max-md:max-h-[calc(100vh-15.5rem)] max-md:min-w-80"
			draggable
			onDragStart={(e) => {
				if (e.target.closest(".task-card")) return; // Don’t set dragdata if dragging a task
				setDragData({ listIndex });
			}}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				e.stopPropagation();

				if (dragData?.listIndex !== undefined) {
					onDropList(listIndex);
				} else if (dragData?.taskId) {
					onDropTask(e, list.id);
				}

				// Otherwise: Ignore — invalid drop
			}}>
			<div className="group flex justify-between items-center px-2 mb-2">
				{!isEditingListName ? (
					<h3
						className="w-13/15 text-sm font-medium cursor-pointer whitespace-nowrap overflow-hidden"
						onClick={() => setIsEditingListName(true)}
						title="Click to edit">
						{list.name}
					</h3>
				) : (
					<input
						className="w-13/15 text-sm font-medium outline-none border-black border-b-1"
						value={listName}
						onChange={(e) => setListName(e.target.value)}
						onBlur={handleRenameList}
						onKeyDown={(e) => {
							e.key === "Enter" && handleRenameList();
							e.key === "Escape" &&
								(setListName(list.name), setIsEditingListName(false));
						}}
						maxLength={28}
						autoFocus
					/>
				)}

				<button
					className="w-5 h-5 cursor-pointer hover:text-red-500 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
					onClick={handleDeleteList}
					title="Confirm delete list? This can't be undone">
					{DELETE_SVG}
				</button>
			</div>

			<div className="list-container overflow-y-auto custom-scrollbar scroll-smooth">
				<div className="flex flex-col gap-y-2">
					{list.tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							listId={list.id}
							boardId={boardId}
							setDragData={setDragData}
							onDropTask={onDropTask}
						/>
					))}
				</div>
			</div>

			<AddTaskCard boardId={boardId} listId={list.id} />
		</div>
	);
};

export default ListColumn;
