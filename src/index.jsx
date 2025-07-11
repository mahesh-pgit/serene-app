import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BoardsProvider } from "./contexts/BoardsContext";
import { BackgroundIdProvider } from "./contexts/BackgroundIdContext";
import { ToastsProvider } from "./contexts/ToastsContext";
import "./styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ToastsProvider>
		<BackgroundIdProvider>
			<BoardsProvider>
				<App />
			</BoardsProvider>
		</BackgroundIdProvider>
	</ToastsProvider>
);
