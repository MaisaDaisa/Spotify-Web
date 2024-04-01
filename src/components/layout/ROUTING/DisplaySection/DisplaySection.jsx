import React, { useState, useEffect } from "react";
import TrackCovers from "./../../../TrackCovers/TrackCovers.jsx";
import ProfileTop from "./../../../ProfileTop/ProfileTop.jsx";
import { GetUsersSavedAlbums } from "../../../../lib/API/getInfo.js";
import { HorizSliderSec } from "./HorizSliderSec/HorizSliderSec.jsx";
import { fetchTopItems } from "../../../../lib/API/getInfo.js";

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
			className={`w-full h-full flex flex-col p-4 rounded-lg overflow-y-scroll spoti-vertial-scrollbar bg-overlay-black ${additionalClass}`}>
			<ProfileTop addClass={"justify-end"} />
			<HorizSliderSec title={"Your Saved Albums"}>
				{usersSavedAlbums[0] ? usersSavedAlbums.map((album) => {
					return (
						<TrackCovers
							key={album.album.uri}
							imgSrc={album.album.images[0].url}
							name={album.album.name}
							artists={album.album.artists}
							uri = {album.album.id}
							type={album.album.type}
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
							uri = {track.id}
							type={track.type}
						/>
					);
				}) : <div></div>}
			</HorizSliderSec>

		</div>
	);
};

export default DisplaySection;