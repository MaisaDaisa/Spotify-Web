import { getToken, refreshSpotifyToken } from "./authorize";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

function dealWithToken(code) {
	const [expiresIn, setExpiresIn] = useState(0);
	const [refreshTokenLocal, setRefreshTokenLocal] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [stampDate, setStampDate] = useState(0);
	const [infoCookies, setInfoCookie, removeInfoCookie] = useCookies(["spotiCookies"]);
	const [tokeCookies, setTokenCookie, removeTokenCookie] = useCookies(["Token"]);

	const saveToken = (response) => {
		if (response.error) {
			console.log(response.error_description, "error");
		} else {;
			const timestamp = new Date().getTime();

			setInfoCookie("spotiCookies", {
				"refresh_token": response.refresh_token,
				"expires_in": response.expires_in,
				"timestamp": timestamp,
			});
			setTokenCookie("Token", response.access_token);
			setRefreshTokenLocal(response.refresh_token);
			setExpiresIn(response.expires_in);
			setAccessToken(response.access_token);
			console.log(timestamp, "timestamp");
			setStampDate(timestamp);
		}
	};

	const fetchToken = async () => {
		try {
			let response = await getToken(code);
			console.log(response, "response");
			saveToken(response);
		} catch (error) {
			console.log(error);
		}
	};

	const refreshTokenFn = async (refresh_token) => {
		try {
			let response = await refreshSpotifyToken(refresh_token);
			console.log(response, "response");
			saveToken(response);
		} catch (error) {
			console.log(error);
			removeInfoCookie(["spotiCookies"]);
			removeTokenCookie(["Token"]);
		}
	};

	useEffect(() => {
		if (code !== "" && !infoCookies.spotiCookies) {
			fetchToken();
		} else if (infoCookies.spotiCookies) {
			const { refresh_token, expires_in, timestamp } = infoCookies.spotiCookies;
			const token = tokeCookies.Token;
			setAccessToken(token);
			setExpiresIn(expires_in);
			setStampDate(timestamp);
			const currentTime = new Date().getTime();
			const timeElapsed = (currentTime - timestamp) / 1000;
			console.log(timeElapsed, "timeElapsed");
			if ( timeElapsed > expires_in ) {
				refreshTokenFn(refresh_token);
			}
		}
	}, [code]);
}

export default dealWithToken;
