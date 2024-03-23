import { useEffect, useState } from "react";
import { getToken, refreshSpotifyToken } from "./authorize";


function useRefreshToken(code) {
  const [expiresIn, setExpiresIn] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const saveToken = (response) => {
    sessionStorage.setItem("access_token", response.access_token);
    setRefreshToken(response.refresh_token);
    setAccessToken(response.access_token);
    setExpiresIn(response.expires_in);
  };

  const fetchToken = async () => {
    let response = await getToken(code)
    console.log(response, "response");
    saveToken(response);
  };

  const refreshTokenFn = async () => {
    let response = await refreshSpotifyToken(refreshToken);
    setAccessToken(response.access_token);
    setExpiresIn(response.expires_in);
    sessionStorage.setItem("access_token", response.access_token);
  };

  useEffect(() => {
    fetchToken();
    window.history.pushState({}, null, "/");
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      refreshTokenFn();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
}

export default useRefreshToken;