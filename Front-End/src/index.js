import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContainer from "./Routes/Auth/AuthContainer";
import SignUp from "./Routes/Auth/SignUp/SignUp";
import Login from "./Routes/Auth/Login/Login";
import Verificaion from "./Routes/Auth/Verification/Verificaion";
import Reset from "./Routes/Auth/Reset/Reset";
import Error from "./Routes/Error/Error";
import Forget from "./Routes/Auth/Forget/Forget";
import Recover from "./Routes/Auth/Recover/Recover";
import WorkSpace from "./Routes/Workspace/WorkSpace";

// Routings
const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <AuthContainer>
        <Error />
      </AuthContainer>
    ),
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
  },
  {
    path: "/auth",
    element: <AuthContainer />,
    children: [
      {
        index: true,
        element: (
          <Provider store={store}>
            <Login />
          </Provider>
        ),
      },
      {
        path: "signup",
        element: (
          <Provider store={store}>
            <SignUp />
          </Provider>
        ),
      },
      {
        path: "verify",
        element: (
          <Provider store={store}>
            <Verificaion />
          </Provider>
        ),
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "forgot",
        element: (
          <Provider store={store}>
            <Forget />
          </Provider>
        ),
      },
      {
        path: "recover",
        element: <Recover />,
      },
    ],
  },
  {
    path: "workspace",
    element: (
      <Provider store={store}>
        <WorkSpace />
      </Provider>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);

reportWebVitals();
