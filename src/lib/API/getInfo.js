export const getTokenFromCookies = () => {
	const name = "Token=";
	const token = document.cookie
		.split(";")
		.find((cookie) => cookie.includes(name));
	return token ? token.replace(name, "") : "";
};

const fetchWithToken = async (url, method = "GET") => {
	const token = getTokenFromCookies();
	const response = await fetch(url, {
		method: method,
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`);
	}

	return await response.json();
};

export async function GetPlaylist(id, market = "GE") {
	const token = getTokenFromCookies();

	try {
		const response = await fetch(
			`https://api.spotify.com/v1/playlists/${id}?market=${market}`,
			{
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch playlist");
		}

		const data = await response.json();
		return data; // Return just the name of the playlist
	} catch (error) {
		console.error("Error fetching playlist:", error);
		throw error;
	}
}

export async function SearchForItems(
	query,
	type,
	limit = 20,
	market = "GE",
	offset = 0
) {
	const url = `https://api.spotify.com/v1/search?q=${query}${
		type === "" ? "" : `&type=${type}`
	}${limit ? `&limit=${limit}` : ""}${market ? `&market=${market}` : ""}${
		offset ? `&offset=${offset}` : ""
	}`;
	console.log(url);
	return await fetchWithToken(url);
}

export async function GetUser(id) {
	return await fetchWithToken(`https://api.spotify.com/v1/users/${id}`);
}

export async function fetchTopItems(
	type,
	timeRange = "medium_term",
	limit = 20,
	offset = 0
) {
	return await fetchWithToken(
		`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`
	);
}

export async function fetchProfile() {
	return await fetchWithToken("https://api.spotify.com/v1/me");
}

export async function fetchUserPlaylists() {
	return await fetchWithToken("https://api.spotify.com/v1/me/playlists");
}

export async function GetCurrentlyPlayingTrack() {
	return await fetchWithToken(
		"https://api.spotify.com/v1/me/player/currently-playing"
	);
}

export async function fetchUserProfile() {
	return await fetchWithToken("https://api.spotify.com/v1/me");
}

export async function GetUsersSavedAlbums() {
	return await fetchWithToken("https://api.spotify.com/v1/me/albums");
}

export async function GetSeveralBrowseCategories(nextLink) {
	const link = nextLink
		? nextLink
		: `https://api.spotify.com/v1/browse/categories?limit=20`;
	return await fetchWithToken(link);
}

export async function GetAvailableDevices() {
	return await fetchWithToken("https://api.spotify.com/v1/me/player/devices");
}

// API PUT REQUESTS //

const putWithToken = async (url) => {
	const token = getTokenFromCookies();
	const result = await fetch(url, {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!result.ok) {
		throw new Error(`Failed to PUT ${url}`);
	}

	return result;
};

export function SeekToPosition(time) {
	return putWithToken(
		`https://api.spotify.com/v1/me/player/seek?position_ms=${time}`
	);
}

export function PauseSong() {
	return putWithToken("https://api.spotify.com/v1/me/player/pause");
}

export function PlaySong() {
	return putWithToken("https://api.spotify.com/v1/me/player/play");
}

export function volumeControl(volume) {
	return putWithToken(
		`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`
	);
}

export const PlaySpecificSongInPlaylist = async (
	playlistUri,
	trackUri,
) => {
	const token = getTokenFromCookies();
	try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                context_uri: `${playlistUri}`,
                offset: {
                    uri: `${trackUri}`
                },
                position_ms: 0
            })
        });
        const data = await response.json();
        console.log(data); // Log the response (optional)
    } catch (error) {
        console.error('Error playing track:', error);
    }
};

export const ToggleShuffle = async (state) => {
	return await putWithToken(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`);
}

export const PlaySpecificSong = async (trackUri) => {
	const token = getTokenFromCookies();
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [trackUri]
            })
        });
        const data = await response.json();
        console.log(data); // Log the response (optional)
    } catch (error) {
        console.error('Error playing song:', error);
    }
};

export const SetRepeatMode = async (state) => {
	return await putWithToken(`https://api.spotify.com/v1/me/player/repeat?state=${state}`);
}


// POST REQUESTS //

const postWithToken = async (url) => {
	const token = getTokenFromCookies();
	const result = await fetch(url, {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!result.ok) {
		throw new Error(`Failed to POST ${url}`);
	}

	return result;
};

export function SkipToPrevious() {
	return postWithToken("https://api.spotify.com/v1/me/player/previous");
}

export function SkipToNext() {
	return postWithToken("https://api.spotify.com/v1/me/player/next");
}
