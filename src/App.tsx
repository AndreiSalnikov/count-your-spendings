import Routing from "./pages/index";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    );
}

export default App;
