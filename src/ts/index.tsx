import React from "react";
import ReactDOM from "react-dom/client";

import "@scss/index.scss";
import Root from "./components/_Root";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
