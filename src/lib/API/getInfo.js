export const getTokenFromCookies = () => {
	const name = "Token=";
	const token = document.cookie
		.split(";")
		.find((cookie) => cookie.includes(name));
	return token ? token.replace(name, "") : "";
};

export async function fetchProfile() {
	const token = getTokenFromCookies();
	const response = await fetch("https://api.spotify.com/v1/me", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch user profile");
	}

	return await response.json();
}

export async function fetchUserPlaylists() {
	const token = getTokenFromCookies();
	const response = await fetch("https://api.spotify.com/v1/me/playlists", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch user playlists");
	}

	return await response.json();
}

export async function GetCurrentlyPlayingTrack() {
	const token = getTokenFromCookies();
	const response = await fetch(
		"https://api.spotify.com/v1/me/player/currently-playing",
		{
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	if (!response.ok) {
		throw new Error("Failed to fetch user current track");
	}

	return await response.json();
}

export async function fetchUserProfile() {
	const token = getTokenFromCookies();
	const response = await fetch("https://api.spotify.com/v1/me", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch user profile");
	}

	return await response.json();
}

export async function GetUsersSavedAlbums() {
	const token = getTokenFromCookies();
	const response = await fetch("https://api.spotify.com/v1/me/albums", {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});
	if (!response.ok) {
		throw new Error("Failed to fetch user saved albums");
	}

	return await response.json();
}

export async function fetchTopItems(type, timeRange = 'medium_term', limit = 20, offset = 0, token) {
    const url = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
	console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch top ${type}`);
    }

    return await response.json();
}


export async function GetPlaylist(id, market="GE") {
	const token = getTokenFromCookies();

	try {
		const response = await fetch(`https://api.spotify.com/v1/playlists/${id}?market=${market}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

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

export async function GetUser(id) {
	const token = getTokenFromCookies();

	try {
		const response = await fetch(`https://api.spotify.com/v1/users/${id}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}

		const data = await response.json();
		return data; // Return just the name of the user
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}


// API PUT REQUESTS //

export function SeekToPosition(time) {
	const token = getTokenFromCookies();
	const result = fetch(
		`https://api.spotify.com/v1/me/player/seek?position_ms=${time}`,
		{
			method: "PUT",
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return result;
}

export function PauseSong() {
	const token = getTokenFromCookies();
	const result = fetch("https://api.spotify.com/v1/me/player/pause", {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
	});
	return result;
}

export function PlaySong() {
	const token = getTokenFromCookies();
	const result = fetch("https://api.spotify.com/v1/me/player/play", {
		method: "PUT",
		headers: { Authorization: `Bearer ${token}` },
	});
	return result;
}


export function volumeControl(volume) {
	const token = getTokenFromCookies();
	const result = fetch(
		`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
		{
			method: "PUT",
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return result;
}


export const PlaySpecificSong = async (contextUri, offsetPosition = 0, positionMs = 0) => {
    const token = getTokenFromCookies();
    const url = 'https://api.spotify.com/v1/me/player/play';

    const data = {
        context_uri: contextUri,
        offset: { position: offsetPosition },
        position_ms: positionMs,
    };

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to play context');
    }

    return await response.json();
};


// POST REQUESTS //

export function SkipToPrevious() {
	const token = getTokenFromCookies();
	const result = fetch("https://api.spotify.com/v1/me/player/previous", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
	return result;
}

export function SkipToNext() {
	const token = getTokenFromCookies();
	const result = fetch("https://api.spotify.com/v1/me/player/next", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
	});
	return result;
}
