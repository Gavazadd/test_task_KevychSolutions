import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ShopPage from "./pages/shopPage";
import {observer} from "mobx-react-lite";

const App = observer(()=> {

    return (
        <BrowserRouter>
            <ShopPage/>
        </BrowserRouter>
    );
})

export default App;