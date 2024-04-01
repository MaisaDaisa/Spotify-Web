import React, { useState, useEffect, useContext, createContext,  } from "react";
import nasPhoto from "../../../assets/images/nas.jpg";
import MusicController from "./MusicController/MusicController";
import MusicSecondaryController from "./MusicController/MusicSecondaryController/MusicSecondaryController";
import { GlobalContext } from "../MainLayout/MainLayout.jsx";


const BottomPlayer = () => {
	const {currentlyPlaying, setCurrentPlaying, initCurrentTracks} = useContext(GlobalContext);
	const [currentlyAlbum, setCurrentAlbum] = React.useState(nasPhoto);
	const [currentName, setCurrentName] = React.useState("For The Mind");
	const [currentArtist, setCurrentArtist] = React.useState([
		{ name: "Nas" },
		{ name: "Nas" },
	]);

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
		<div className="w-full h-fit grid grid-cols-3 bg-overlay-black p-3 rounded-3xl">
			<div className="flex flex-row gap-4 items-center flex-1">
				<img
					src={currentlyAlbum}
					alt="something"
					className="w-24 h-24 rounded-2xl"
				/>
				<div className="overflow-x-auto col-span-1 w-1/2">
					<div className="overflow-x-scroll bottom-player-text  text-nowrap">
                        <h1 className="font-bold text-lg">{currentName}</h1>
                    </div>
					<div className="flex flex-row text-nowrap gap-1  bottom-player-text  overflow-x-scroll ">
						{currentArtist.map((artist, index) => {
							return <p className="text-sm" key={artist.id}>{artist.name}{currentArtist.length - 1 === index ? ' ' : ", "} </p>;
						})}
					</div>
				</div>
			</div>
				<MusicController />
			<MusicSecondaryController volumeProp={100} />
		</div>
	);
};

export default BottomPlayer;