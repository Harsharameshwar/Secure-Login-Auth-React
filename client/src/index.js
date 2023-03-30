import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { AuthProvider } from 'react-auth-kit'

const root = ReactDOM.createRoot(document.getElementById("root"));
const engine = new Styletron();
root.render(
  <React.StrictMode>
   <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={true}>
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            <App />
        </BaseProvider>
    </StyletronProvider>
    </AuthProvider>
  </React.StrictMode>
);
