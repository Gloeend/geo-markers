import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";

import './index.scss';
import "./_reset.scss";

import WebFont from "webfontloader";

import {AppRouter} from "@app/app-router";
import {ReduxProvider} from "@app/store";
import {MapProvider} from "@app/map-provider";

WebFont.load({
  google: {
    families: ["Inter:300,400,500,600,700,800", "sans-serif"]
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MapProvider>
        <ReduxProvider>
            <BrowserRouter>
                <main>
                    <AppRouter/>
                </main>
            </BrowserRouter>
        </ReduxProvider>
    </MapProvider>,
)