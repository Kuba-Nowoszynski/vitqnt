import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.jsx";
import Error from "./routes/error/Error.jsx";
import ReactDOM from "react-dom/client";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}>
      <RouterProvider router={router}></RouterProvider>
    </ErrorBoundary>
  </StrictMode>
);
