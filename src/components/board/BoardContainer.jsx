import { useState, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import ListColumn from "../list/ListColumn";
import AddListColumn from "../list/AddListColumn";

const BoardContainer = ({ activeBoard, setActiveBoard }) => {
	const { boards, setBoards } = useBoards();
	const [dragData, setDragData] = useState(null);

	useEffect(() => {
		setActiveBoard(boards.find((board) => board.id === activeBoard.id));
	}, [boards]);

	const handleDrop = (e, destinationListId, destinationTaskId = null) => {
		e.preventDefault();

		console.log("🫳 DROP:", {
			dragData,
			destinationListId,
			destinationTaskId,
		});

		if (!dragData || !dragData.taskId || !dragData.sourceListId) return;
		if (destinationListId === undefined) return;

		const { sourceListId, taskId } = dragData;

		if (destinationListId === sourceListId && destinationTaskId === taskId) return; // Ignore dropping on itself

		const sourceList = activeBoard.lists.find((list) => list.id === sourceListId);
		const taskToMove = sourceList.tasks.find((task) => task.id === taskId);

		if (!taskToMove) return;

		const updatedLists = activeBoard.lists.map((list) => {
			if (list.id === sourceListId && list.id === destinationListId) {
				// Reorder tasks within same list
				const updatedTasks = [...list.tasks];

				const fromIndex = updatedTasks.findIndex((t) => t.id === taskId);
				const toIndex = updatedTasks.findIndex((t) => t.id === destinationTaskId);

				if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return list;

				const [movedTask] = updatedTasks.splice(fromIndex, 1);

				// Always insert before destination
				updatedTasks.splice(toIndex, 0, movedTask);

				return {
					...list,
					tasks: updatedTasks,
				};
			}

			if (list.id === sourceListId) {
				// Remove task from original list
				return {
					...list,
					tasks: list.tasks.filter((t) => t.id !== taskId),
				};
			}

			if (list.id === destinationListId) {
				// Insert task in new list
				const updatedTasks = [...list.tasks];
				if (destinationTaskId) {
					const index = updatedTasks.findIndex((t) => t.id === destinationTaskId);
					updatedTasks.splice(index, 0, taskToMove);
				} else {
					updatedTasks.push(taskToMove);
				}

				return {
					...list,
					tasks: updatedTasks,
				};
			}

			// Leave untouched
			return list;
		});

		console.log("🧩 Moving task", {
			from: sourceListId,
			to: destinationListId,
			taskId,
			destinationTaskId,
		});

		setBoards((prevBoards) =>
			prevBoards.map((board) =>
				board.id === activeBoard.id ? { ...board, lists: updatedLists } : board
			)
		);

		setDragData(null);
	};

	const handleListDrop = (targetIndex) => {
		if (dragData?.listIndex === undefined) return;

		const newLists = [...activeBoard.lists];
		const [movedList] = newLists.splice(dragData.listIndex, 1);
		newLists.splice(targetIndex, 0, movedList);

		setBoards((prevBoards) =>
			prevBoards.map((board) =>
				board.id === activeBoard.id ? { ...board, lists: newLists } : board
			)
		);

		setDragData(null);
	};

	return (
		<div className="board-container grow p-3 overflow-x-auto whitespace-nowrap custom-scrollbar scroll-smooth">
			<div className="flex gap-x-3 items-start">
				{activeBoard.lists.map((list, index) => (
					<ListColumn
						key={list.id}
						list={list}
						boardId={activeBoard.id}
						listIndex={index}
						dragData={dragData}
						setDragData={setDragData}
						onDropTask={handleDrop}
						onDropList={handleListDrop}
					/>
				))}

				<AddListColumn boardId={activeBoard.id} />
			</div>
		</div>
	);
};

export default BoardContainer;
