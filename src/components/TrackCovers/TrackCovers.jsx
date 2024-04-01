import React from "react";
import Nas from "../../assets/images/nas.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { PlaySpecificSong } from "../../lib/API/getInfo";
import { useContext } from "react";

import { GlobalContext } from "../layout/MainLayout/MainLayout";

const TrackCovers = ({ imgSrc, name, artists, uri }) => {
	const { currentlyPlaying, setCurrentPlaying, initCurrentTracks } =
	useContext(GlobalContext);

	function handleClick () {
		PlaySpecificSong(uri);
		setTimeout(() => {
			initCurrentTracks();
		}, 2000);
	}
	return (
		<div className="group flex flex-col items-start gap-2 flex-shrink-0 w-[160px]">
			<div className="track-image relative cursor-pointer" 
			onClick={() => handleClick()}>
				<img
					src={imgSrc ? imgSrc : Nas}
					alt=""
					className="w-40 h-40 rounded-lg group-hover:opacity-30 transition duration-300 ease-in-out"
				/>
				<FontAwesomeIcon icon={faPlay} size="2xl" style={{color: "#ffffff",}} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 cursor-pointer" />
			</div>
			<div className="flex flex-col w-[160px] gap-1">
				<h1 className="text-default-font text-md  overflow-x-scroll text-nowrap bottom-player-text">
					{name ? name : "For the mind"}
				</h1>
				<div className="flex flex-row gap-1 overflow-x-scroll text-nowrap bottom-player-text">
					{artists ? (
						artists.map((artist, index) => {
              return (
							<a className="text-secondary-font text-sm">{artist.name}{index === artists.length-1 ? ' ': ','} </a>
              );
						})
					) : (
						<a className="text-secondary-font text-sm">Nas</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default TrackCovers;
