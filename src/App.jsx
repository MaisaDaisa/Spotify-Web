import  React from "react";
import { authorize} from "./lib/API/authorize";
import useRefreshToken from "./lib/API/useRefreshToken.js";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx"; 
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/player",
    element: <MainLayout />,
  },
  {
    path: "/explore",
    element: <MainLayout />,
  },
]
);


function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");
  if (code) {
    useRefreshToken(code);
  }
  return (
    <>
      <div className= {`flex h-dvh flex-col ${!code ? "items-center justify-center" : " "} p-4 bg-background-pitch-black`}>
      {code ? (
          <MainLayout />
      ) : (
        <button className="p-3 bg-green-500" onClick={authorize}>
          Click Me
        </button>
      )}
    </div>
    </>
  )
}

export default App
