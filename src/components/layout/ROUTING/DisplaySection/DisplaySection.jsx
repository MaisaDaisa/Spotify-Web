import React, { useState, useEffect } from "react";
import TrackCovers from "./../../../TrackCovers/TrackCovers.jsx";
import ProfileTop from "./../../../ProfileTop/ProfileTop.jsx";
import { GetUsersSavedAlbums } from "../../../../lib/API/getInfo.js";
import { HorizSliderSec } from "./HorizSliderSec/HorizSliderSec.jsx";
import { fetchTopItems } from "../../../../lib/API/getInfo.js";
import  AlbumDisplayCover  from "./../../../AlbumDisplayCover/AlbumDisplayCover.jsx";

const DisplaySection = ({ additionalClass }) => {
	const [usersSavedAlbums, setUsersSavedAlbums] = useState([]);
	const [usersTopTracks, setUsersTopTracks] = useState([]);
	useEffect(() => {
		GetUsersSavedAlbums().then((data) => {
			setUsersSavedAlbums(data.items);
		});
		fetchTopItems("tracks").then((data) => {
			setUsersTopTracks(data.items);
		});
	}, []);
	return (
		<div
			className={`w-full h-full flex flex-col p-4 rounded-lg overflow-y-scroll spotify-vertical-scrollbar bg-overlay-black ${additionalClass}`}>
			<ProfileTop addClass={"justify-end"} />
			<HorizSliderSec title={"Your Saved Albums"}>
				{usersSavedAlbums[0] ? usersSavedAlbums.map((album) => {
					return (
						<AlbumDisplayCover
							key={album.album.uri}
							imgSrc={album.album.images[0].url}
							name={album.album.name}
							artists={album.album.artists}
							uri = {album.album.uri}
						/>
					);
				}) : <div></div>}
			</HorizSliderSec>
			<HorizSliderSec title={"Your Top tracks"} >
				{usersTopTracks[0] ? usersTopTracks.map((track) => {
					return (
						<TrackCovers
							key={track.id}
							imgSrc={track.album.images[0].url}
							name={track.name}
							artists={track.artists}
							uri = {track.uri}
						/>
					);
				}) : <div></div>}
			</HorizSliderSec>

		</div>
	);
};

export default DisplaySection;
