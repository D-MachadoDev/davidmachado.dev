import { createRoot } from "react-dom/client"; // EntryPoint React 18+, expone createRoot, "client" indica APIs para el cliente(navegador)
import App from "./app/App"; // export dafault sin {}
import "./styles/index.css"; // css Global en el bundle(dist)

createRoot(document.getElementById("root")!).render(<App />);
  
