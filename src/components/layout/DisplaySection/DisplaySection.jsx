import React, { useState, useEffect } from "react";
import AlbumCovers from "./AlbumCovers/AlbumCovers.jsx";
import ProfileTop from "./../../ProfileTop/ProfileTop.jsx";
import { GetUsersSavedAlbums } from "../../../lib/API/getInfo.js";
import { HorizSliderSec } from "./HorizSliderSec/HorizSliderSec.jsx";
import { fetchTopItems } from "../../../lib/API/getInfo.js";

const DisplaySection = ({ additionalClass }) => {
	const [usersSavedAlbums, setUsersSavedAlbums] = useState([]);
	const [usersTopTracks, setUsersTopTracks] = useState([]);
	useEffect(() => {
		GetUsersSavedAlbums().then((data) => {
			setUsersSavedAlbums(data.items);
		});
		console.log(usersSavedAlbums);
		fetchTopItems("tracks").then((data) => {
			setUsersTopTracks(data.items);
		});
	}, []);
	return (
		<div
			className={`w-full h-full flex flex-col p-4 rounded-lg bg-overlay-black ${additionalClass}`}>
			<ProfileTop addClass={"justify-end"} />
			<HorizSliderSec title={"Your Saved Albums"}>
				{usersSavedAlbums[0] ? usersSavedAlbums.map((album) => {
					return (
						<AlbumCovers
							key={album.album.uri}
							imgSrc={album.album.images[0].url}
							name={album.album.name}
							artists={album.album.artists}
						/>
					);
				}) : <div></div>}
			</HorizSliderSec>
			<HorizSliderSec title={"Your Top tracks"} >
				{usersTopTracks[0] ? usersTopTracks.map((track) => {
					return (
						<AlbumCovers
							key={track.uri}
							imgSrc={track.album.images[0].url}
							name={track.name}
							artists={track.artists}
						/>
					);
				}) : <div></div>}
			</HorizSliderSec>

		</div>
	);
};

export default DisplaySection;
