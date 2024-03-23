import React, { createContext } from "react";
import { authorize } from "./lib/API/authorize";
import dealWithToken from "./lib/API/dealWithToken.js";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import { useCookies } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
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
]);

function App() {
	const [cookie, setCookie] = useCookies(["spotiCookies"]);
	let code = "";
	const searchParams = new URLSearchParams(window.location.search);
	const codeParam = searchParams.get("code");

	if (codeParam && codeParam !== "" && code !== codeParam) {
		code = codeParam;
	}
	dealWithToken(code);

	return (
		<>
			<div
				className={`flex h-dvh flex-col ${
					!cookie.spotiCookies ? "items-center justify-center" : " "
				} p-4 bg-background-pitch-black`}>
				{cookie.spotiCookies ? (
					<MainLayout />
				) : (
					<button className="p-3 bg-green-500" onClick={authorize}>
						Click Me
					</button>
				)}
			</div>
		</>
	);
}

export default App;
