const CLIENT_ID = "b4c04bfb6ac5435780ece06d2fbb3812";
const REDIRECT_URI = "http://localhost:5173";

const generateRandomString = (length) => {
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

async function generateCodeChallenge(codeVerifier) {
	const base64encode = (input) => {
		return btoa(String.fromCharCode(...new Uint8Array(input)))
			.replace(/=/g, "")
			.replace(/\+/g, "-")
			.replace(/\//g, "_");
	};
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest("SHA-256", data);

	return base64encode(new Uint8Array(digest));
}

const codeVerifier = generateRandomString(128);
let urlParams = new URLSearchParams();

if (typeof window !== "undefined") {
	urlParams = new URLSearchParams(window.location.search);
}

export const authorize = async () => {
	generateCodeChallenge(codeVerifier).then((codeChallenge) => {
		const state = generateRandomString(16);
		const scope =
			"user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state";

		sessionStorage.setItem("code_verifier", codeVerifier);

		const args = new URLSearchParams({
			response_type: "code",
			client_id: CLIENT_ID,
			scope: scope,
			redirect_uri: REDIRECT_URI,
			state: state,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
		});

		window.location.href = "https://accounts.spotify.com/authorize?" + args;
	});
};

export const getToken = async (code) => {
	const codeVerifier = sessionStorage.getItem("code_verifier");

	const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
        }),
      }
      try {
        const body = await fetch("https://accounts.spotify.com/api/token", payload);
        const response =await body.json();
        return response;
      } catch (error) {
        console.log(error);
      }
};

export const refreshSpotifyToken = async (refresh_token) => {
	const body = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: refresh_token,
		client_id: CLIENT_ID,
	});
	try {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: body,
		});

		data = await response.json();
		console.log(data, "data");
		return data;
	} catch (error) {
		window.location.href = "/";
	}
};

