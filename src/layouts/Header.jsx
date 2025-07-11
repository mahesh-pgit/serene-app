import { useState, useRef, useEffect } from "react";
import { useBackgroundId } from "../contexts/BackgroundIdContext";
import { backgrounds } from "../constants/backgrounds";
import { BACKGROUND_SVG, CROSS_SVG } from "../assets/SVGs";

const Header = () => {
	const [isBackgroundPanelOpen, setIsBackgroundPanelOpen] = useState(false);
	const { setBackgroundId } = useBackgroundId();

	const panelRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (panelRef.current && !panelRef.current.contains(event.target)) {
				setIsBackgroundPanelOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const bgItemStyles = "w-40 h-24 rounded-lg bg-cover bg-center cursor-pointer ";

	return (
		<header className="w-screen h-14 flex justify-between items-center">
			<div className="text-3xl font-light ml-2 md:ml-10">🍁Serene</div>

			<div>
				<div
					className="relative w-8 h-8 mr-5 cursor-pointer md:mr-10"
					onClick={() => setIsBackgroundPanelOpen(!isBackgroundPanelOpen)}
					title="Change background">
					{BACKGROUND_SVG}
				</div>

				{isBackgroundPanelOpen && (
					<div
						ref={panelRef}
						className="absolute z-100 w-90 py-3 top-2 right-2 bg-white rounded-lg">
						<div className="relative flex justify-center items-center mb-3">
							<h1 className="text-black/70 font-medium">Change Background</h1>

							<div
								className="absolute right-3 p-1 text-black cursor-pointer rounded-lg hover:bg-black/10 md:right-9"
								onClick={() => setIsBackgroundPanelOpen(false)}>
								{CROSS_SVG}
							</div>
						</div>

						<ul className="max-h-128 mx-2 flex flex-wrap justify-center items-center gap-2 overflow-y-auto custom-scrollbar scroll-smooth">
							{backgrounds.map((background) => (
								<li
									key={background.id}
									className={bgItemStyles + background?.bgStyles}
									onClick={() => setBackgroundId(background.id)}></li>
							))}
						</ul>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
