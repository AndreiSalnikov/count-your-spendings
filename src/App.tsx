import Routing from "./pages/index";
import {BrowserRouter, HashRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    );
}

export default App;
