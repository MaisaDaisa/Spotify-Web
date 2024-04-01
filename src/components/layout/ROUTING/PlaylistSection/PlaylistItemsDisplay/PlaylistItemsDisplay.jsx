import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { PlaySpecificSongInPlaylist } from "../../../../../lib/API/getInfo";
import { GlobalContext } from "../../../MainLayout/MainLayout.jsx";

export const PlaylistItemsDisplay = ({ Track, index, playlistUri }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const {currentlyPlaying, setCurrentPlaying, initCurrentTracks} = React.useContext(GlobalContext);

	const handlePlayClick = async () => {
		try {
			console.log("Playing specific song", Track.track.uri);
			PlaySpecificSongInPlaylist(playlistUri, Track.track.uri)
			setTimeout(() => {
				initCurrentTracks();
			}, 1000);
		} catch (error) {
			console.error("Error playing specific song:", error);
		}
	};
	return (
		<div
			className={`flex flex-row gap-4 p-2 pl-5 rounded-md items-center flex-1 ${
				isHovered ? "bg-[#565656] bg-opacity-20" : ""
			}`}
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}>
			<div className="w-6 h-6">
				{!isHovered ? (
					<p className="font-medium text-lg">{index + 1}</p>
				) : (
					<FontAwesomeIcon
						icon={faPlay}
						style={{ color: "#ffffff" }}
						className="text-white cursor-pointer ml-1"
						onClick={handlePlayClick}
					/>
				)}
			</div>
			<img
				src={Track.track?.album.images[0].url}
				alt="something"
				className="w-12 h-12 rounded-md"
			/>
			<div className="overflow-x-auto col-span-1 w-1/2">
				<div className="overflow-x-scroll bottom-player-text  text-nowrap">
					<h1 className="font-bold text-lg">{Track.track?.name}</h1>
				</div>
				<div className="flex flex-row gap-1">
				{Track.track?.artists.map((artist, index) => {
					return (
						<p className="text-sm" key={index}>
							{artist.name}{index === Track.track.artists.length - 1 ? "" : ", "}
						</p>
					);
				})}
				</div>
			</div>
		</div>
	);
};
