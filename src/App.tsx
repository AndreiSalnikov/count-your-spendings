import Routing from "./pages/index";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routing/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
