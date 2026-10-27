import { createRoot } from "react-dom/client"; // React 18+ entry point ("client" = browser APIs)
import App from "./app/App";
import "./styles/index.css"; // Global styles for the bundle

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element #root was not found in index.html");
}

createRoot(rootElement).render(<App />);
