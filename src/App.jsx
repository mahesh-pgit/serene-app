import { useState } from "react";
import AppLayout from "./layouts/AppLayout";
import Onboarding from "./layouts/Onboarding";

const App = () => {
	const [showOnboarding, setShowOnboarding] = useState(
		localStorage.getItem("serene-boards")
			? localStorage.getItem("serene-boards") === "[]"
			: true
	);

	return (
		<div className="app w-screen h-screen m-0 p-0 select-none">
			{!showOnboarding && <AppLayout />}

			{showOnboarding && <Onboarding setShowOnboarding={setShowOnboarding} />}
		</div>
	);
};

export default App;
