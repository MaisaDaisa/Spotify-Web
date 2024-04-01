import React from "react";
import { authorize } from "./lib/API/authorize";
import dealWithToken from "./lib/API/dealWithToken.js";
import MainLayout from "./components/layout/MainLayout/MainLayout.jsx";
import { useCookies } from "react-cookie";
import "./index.css";


function App() {
	const [cookie] = useCookies(["spotiCookies"]);
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
				className={`flex  ${
					!cookie.spotiCookies ? "items-center justify-center h-screen w-svw flex-col" : " "
				} bg-background-pitch-black`}>
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
