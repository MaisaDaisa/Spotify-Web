import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faBackwardStep,
	faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import nasPhoto from "../../../assets/images/nas.jpg";
import "./BottomPlayer.css";
import { GetCurrentlyPlayingTrack } from "../../../lib/API/getInfo";

const BottomPlayer = () => {
	const [currentlyPlaying, setCurrentPlaying] = React.useState({});
	const [currentlyAlbum, setCurrentAlbum] = React.useState(nasPhoto);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [currentName, setCurrentName] = React.useState("For The Mind");
	const [currentArtist, setCurrentArtist] = React.useState([
		{ name: "Nas" },
		{ name: "Nas" },
	]);

	useEffect(() => {
		GetCurrentlyPlayingTrack().then((response) => {
			setCurrentPlaying(response);
		});
	}, []);

	useEffect(() => {
		setCurrentName(
			currentlyPlaying.item ? currentlyPlaying.item.name : "For The Mind"
		);
		setCurrentArtist(
			currentlyPlaying.item
				? currentlyPlaying.item.artists
				: [{ name: "Nas" }, { name: "Nas" }]
		);
		setCurrentAlbum(
			currentlyPlaying.item ? currentlyPlaying.item.album.images[0].url : nasPhoto
		);
	}, [currentlyPlaying]);

	return (
		<div className="w-full flex flex-row flex-nowrap bg-overlay-black p-3 rounded-3xl flex-1">
			<div className="flex flex-row gap-4 items-center">
				<img
					src={currentlyAlbum}
					alt="something"
					className="w-24 h-24 rounded-2xl"
				/>
				<div className=" w-96">
					<div className="overflow-x-scroll bottom-player-text  text-nowrap">
                        <h1 className="font-bold text-lg">{currentName}</h1>
                    </div>
					<div className="flex flex-row text-nowrap gap-1  bottom-player-text  overflow-x-scroll ">
						{currentArtist.map((artist) => {
							return <p className="text-sm" key={artist.id}>{artist.name}, </p>;
						})}
					</div>
				</div>
			</div>
			<div className="w-4/6 flex flex-row flex-nowrap justify-center items-center gap-20">
				<div className="flex flex-row flex-nowrap gap-8">
					<FontAwesomeIcon
						icon={faBackwardStep}
						size="2xl"
						style={{ color: "#ffffff" }}
					/>
					<FontAwesomeIcon
						icon={faPlay}
						size="2xl"
						style={{ color: "#ffffff" }}
					/>
					<FontAwesomeIcon
						icon={faForwardStep}
						size="2xl"
						style={{ color: "#ffffff" }}
					/>
				</div>
				<div className="w-full">
					<input
						type="range"
						name="volume"
						id="volume"
						min="0"
						max="100"
						className="spoti-slider"
					/>
				</div>
			</div>
		</div>
	);
};

export default BottomPlayer;
