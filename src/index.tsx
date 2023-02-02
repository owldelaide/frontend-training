import { render } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemePropvider from "./theme/ThemePropvider";

render(
    <BrowserRouter>
        <ThemePropvider>
            <App />
        </ThemePropvider>
    </BrowserRouter>,
    document.getElementById('root')
)