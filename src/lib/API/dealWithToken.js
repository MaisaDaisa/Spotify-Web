import { getToken, refreshSpotifyToken } from "./authorize";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function dealWithToken(code) {
	const [expiresIn, setExpiresIn] = useState(0);
	const [refreshToken, setRefreshToken] = useState("");
	const [accessToken, setAccessToken] = useState("");
	const [stampDate, setStampDate] = useState(0);
	const [infoCookies, setInfoCookie] = useCookies(["spotiCookies"]);
	const [tokeCookies, setTokenCookie] = useCookies(["SpotiToken"]);

	const saveToken = (response) => {
		const timestamp = new Date().getTime();

		setInfoCookie("spotiCookies", {
			"refresh_token": response.refresh_token,
			"expires_in": response.expires_in,
			"timestamp": timestamp,
		});
		setTokenCookie("Token", response.access_token);
		
		setRefreshToken(response.refresh_token);
		setExpiresIn(response.expires_in);
		setAccessToken(response.access_token);
		console.log(timestamp, "timestamp");
		setStampDate(timestamp);
	};

	const fetchToken = async () => {
		try {
			let response = await getToken(code);
			saveToken(response);
		} catch (error) {
			console.log(error);
		}
	};

	const refreshTokenFn = async () => {
		try {
			let response = await refreshSpotifyToken(refreshToken);
			console.log(response, "response");
			saveToken(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (code !== "" && !infoCookies.spotiCookies) {
			fetchToken();
		} else if (infoCookies.spotiCookies) {
			const { refresh_token, expires_in, timestamp } = infoCookies.spotiCookies;
			const { token } = tokeCookies.Token;
			setAccessToken(token);
			setRefreshToken(refresh_token);
			setExpiresIn(expires_in);
			setStampDate(timestamp);
			const currentTime = new Date().getTime();
			const timeElapsed = (currentTime - timestamp) / 1000;
			console.log(timeElapsed, "timeElapsed");
			if ( timeElapsed > expires_in ) {
				refreshTokenFn();
			}
		}
	}, [code]);
}

export default dealWithToken;
