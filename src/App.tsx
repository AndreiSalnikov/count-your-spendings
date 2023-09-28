import Routing from "./pages/index";
import {BrowserRouter, HashRouter} from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <Routing/>
        </HashRouter>
    );
}

export default App;
