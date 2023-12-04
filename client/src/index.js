import ReactDom from "react-dom/client"
import App from "./components/App";
import { UserProvider } from "./components/UserContext";

const root = ReactDom.createRoot(document.getElementById("root"));


root.render(
    <UserProvider>
<App />
    </UserProvider>
)

