import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer toastClassName="elevation-5 bg-gray-200" />
    </Provider>
  </BrowserRouter>
  //</React.StrictMode>
);
