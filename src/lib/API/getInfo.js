
export const getTokenFromCookies = () => {
    const name = 'Token=';
    const token = document.cookie.split(';').find(cookie => cookie.includes(name));
    return token ? token.replace(name, '') : '';
}

export async function fetchProfile(){
    const token = getTokenFromCookies();
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const data = await result.json();
    return data;
}

export async function fetchUserPlaylists(){
    const token = getTokenFromCookies();
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const data = await result.json();
    return data;
}

export async function GetCurrentlyPlayingTrack() {
    const token = getTokenFromCookies();
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const data = await result.json();
    return data;
}

export async function fetchUserProfile() {
    const token = getTokenFromCookies();
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    const data = await result.json();
    console.log(data);
    return data;
}




