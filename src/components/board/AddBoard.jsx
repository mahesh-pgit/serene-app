import { useState, useRef, useEffect } from "react";
import { useBoards } from "../../contexts/BoardsContext";
import { useToasts } from "../../contexts/ToastsContext";
import { todo_board } from "../../templates/todo-board";
import { content_creation_board } from "../../templates/content-creation-board";
import { personal_productivity_board } from "../../templates/personal-productivity-board";
import { project_management_board } from "../../templates/project-management-board";
import { shopping_board } from "../../templates/shopping-board";
import { short_term_progress_tracker_board } from "../../templates/short-term-progress-tracker-board";
import { weekly_planner_board } from "../../templates/weekly-planner-board";
import { CROSS_SVG } from "../../assets/SVGs";

const AddBoard = ({ setActiveBoard, setIsSidebarOpen }) => {
	const { boards, setBoards } = useBoards();
	const [isAddingBoard, setIsAddingBoard] = useState(false);
	const [newBoardName, setNewBoardName] = useState("");
	const { showToast } = useToasts();

	const addBoardRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (addBoardRef.current && !addBoardRef.current.contains(event.target)) {
				setIsAddingBoard(false);
				setNewBoardName("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleAddBoard = () => {
		if (newBoardName === "") {
			showToast("Board Name cannot be empty, Please enter a proper name", "error");
			return;
		}

		if (!newBoardName.trim()) {
			showToast("Board Name cannot contain only spaces, Please enter a proper name", "error");
			setNewBoardName("");
			return;
		}

		const isDuplicate = boards.some((board) => board.name.trim() === newBoardName.trim());
		if (isDuplicate) {
			showToast("Board Name already exists, Please enter a different name", "error");
			return;
		}

		const newBoard = {
			id: Date.now().toString(),
			name: newBoardName,
			lists: [],
		};

		setBoards([...boards, newBoard]);
		setActiveBoard(newBoard);
		setNewBoardName("");
		setIsAddingBoard(false);
		setIsSidebarOpen(false);

		showToast("Board created successfully", "success");
	};

	const templates_data = [
		{ title: "TODO Board 📋", templateObject: todo_board },
		{
			title: "Project Management 💻",
			templateObject: project_management_board,
		},
		{
			title: "Personal Productivity 💪",
			templateObject: personal_productivity_board,
		},
		{
			title: "Short-Term Progress Tracker 📊",
			templateObject: short_term_progress_tracker_board,
		},
		{ title: "Weekly Planner 🗓️", templateObject: weekly_planner_board },
		{ title: "Shopping 🛍️🛒", templateObject: shopping_board },
		{ title: "Content Creation 📱", templateObject: content_creation_board },
	];

	const handleAddTemplateBoard = (templateTitle, templateBoard) => {
		const isDuplicate = boards.some((board) => board.name.trim() === templateBoard.name.trim());
		if (isDuplicate) {
			showToast("Board with the selected template already exists", "error");
			return;
		}

		let newBoard = structuredClone(templateBoard);

		newBoard = { ...newBoard, id: Date.now().toString() };

		setBoards([...boards, newBoard]);
		setActiveBoard(newBoard);
		setNewBoardName("");
		setIsAddingBoard(false);
		setIsSidebarOpen(false);

		showToast(`Board successfully created from ‘${templateTitle}’ template.`, "success");
	};

	const templateItemStyles =
		"p-2 text-sm bg-white/15 rounded-md cursor-pointer hover:bg-white/30";

	return (
		<div className="p-2">
			<button
				className="w-full text-md p-2 bg-black/15 rounded-md cursor-pointer hover:bg-black/25"
				onClick={() => setIsAddingBoard(true)}>
				Create new board
			</button>

			{isAddingBoard && (
				<div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50 max-md:w-[calc(100vw-1rem)] max-md:h-[calc(100vh-11rem)] max-md:rounded-lg">
					<div
						ref={addBoardRef}
						className="w-86 p-4 flex flex-col gap-y-2 text-white bg-black/70 rounded-md">
						<div className="relative flex justify-center items-center">
							<h1 className="font-medium">Create Board</h1>

							<div
								className="absolute right-0 p-2 rounded-md cursor-pointer hover:bg-white/20"
								onClick={() => setIsAddingBoard(false)}>
								{CROSS_SVG}
							</div>
						</div>

						<div className="flex flex-col gap-y-1">
							<label className="text-xs">
								Board title<sup className="text-red-600">*</sup>
							</label>

							<input
								className="w-full text-sm p-2 mb-2 rounded-md border border-white/80 outline-none focus:border-sky-500"
								value={newBoardName}
								onChange={(e) => setNewBoardName(e.target.value)}
								onKeyDown={(e) => {
									e.key === "Enter" && handleAddBoard();
									e.key === "Escape" &&
										(setIsAddingBoard(false), setNewBoardName(""));
								}}
								maxLength={40}
								autoFocus
							/>

							<button
								className="w-full text-sm p-2 bg-sky-500 rounded-md cursor-pointer hover:bg-sky-400 disabled:bg-gray-400 disabled:cursor-default"
								onClick={handleAddBoard}
								disabled={newBoardName === "" || !newBoardName.trim()}>
								Create
							</button>
						</div>

						<h1 className="text-xs text-center">OR</h1>

						<div>
							<h1 className="text-center">Create from Template</h1>
							<ul className="flex flex-col gap-y-2 mt-2">
								{templates_data.map((template) => (
									<li
										className={templateItemStyles}
										onClick={() =>
											handleAddTemplateBoard(
												template.title,
												template.templateObject
											)
										}
										title="Click to use this template">
										{template.title}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddBoard;
