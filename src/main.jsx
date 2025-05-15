import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from '../src/pages/home/index'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
