import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faBackwardStep,
	faForwardStep,
	faPause,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../../layout/MainLayout/MainLayout.jsx";
import "./MusicController.css";
import MusicDurationController from "./MusicDurationController/MusicDurationController";
import {
	SeekToPosition,
	PauseSong,
	PlaySong,
	SkipToNext,
	SkipToPrevious,
} from "../../../../lib/API/getInfo";

const MusicController = () => {
	const { currentlyPlaying, setCurrentPlaying, initCurrentTracks } =
		useContext(GlobalContext);
	const [totalTime, setTotalTime] = useState(999999);
	const [Playing, setPlaying] = useState(false);
	const [timeIntoSong, setTimeIntoSong] = useState(0);
	const [autoRefreshInterval, setAutoRefreshInterval] = useState(null);

	function createInterval() {
		const interval = setInterval(() => {
			setTimeIntoSong((prevTime) => prevTime + 1000);
		}, 1000);
		setAutoRefreshInterval(interval);
		return () => clearInterval(interval);
	}

	useEffect(() => {
		if (!currentlyPlaying.item) return;
		setTotalTime(currentlyPlaying.item.duration_ms);
		setTimeIntoSong(currentlyPlaying.progress_ms);
		setPlaying(currentlyPlaying.is_playing);
	}, [currentlyPlaying]);

	useEffect(() => {
		if (!currentlyPlaying.item) return;
		if (timeIntoSong >= totalTime - 4000) {
			setTimeout(() => {
				initCurrentTracks();
			}, 2000);
		}
	}, [timeIntoSong]);

	useEffect(() => {
		console.log(Playing);
		if (Playing === true) {
			createInterval();
		} else {
			clearInterval(autoRefreshInterval);
		}
	}, [Playing]);

	// SLIDER FUNCTIONALITY //

	const handleTimePosition = (e) => {
		const time = Math.floor((e.target.value / e.target.max) * totalTime);
		setTimeIntoSong(time);
		SeekToPosition(time);
	};

	// BUTTON FUNCTIONALITY //

	const handlePause = () => {
		setPlaying(false);
		PauseSong();
	};
	const handlePlay = () => {
		setPlaying(true);
		PlaySong();
	};
	const handleSkipToNext = () => {
		SkipToNext();
		setTimeout(() => {
			initCurrentTracks();
		}, 1000);
	};
	const handleSkipToPrevious = () => {
		SkipToPrevious();
		setTimeout(() => {
			initCurrentTracks();
		}, 1000);
	};

	return (
		<div className="flex-1 w-full flex flex-col flex-nowrap justify-center items-center gap-4">
			<div className="flex flex-row items-center flex-nowrap gap-6">
				<FontAwesomeIcon
					icon={faBackwardStep}
					size="xl"
					style={{ color: "#B2B2B2" }}
					onClick={() => handleSkipToPrevious()}
					onMouseEnter={(e) => {
						e.target.style.color = "#ffffff";
					}}
					onMouseLeave={(e) => {
						e.target.style.color = "#B2B2B2";
					}}
					className="cursor-pointer w-7 h-7"
				/>
				<div
					className="playPauseButton flex justify-center items-center cursor-pointer bg-[#ffffff] rounded-full p-1 w-12 h-12 
							ease-in-out duration-150">
					{Playing === true ? (
						<FontAwesomeIcon
							icon={faPause}
							size="xl"
							style={{ color: "#1B1A1A" }}
							onClick={() => handlePause()}
						/>
					) : (
						<FontAwesomeIcon
							icon={faPlay}
							size={"xl"}
							style={{ color: "#1B1A1A" }}
							onClick={() => handlePlay()}
							className="ml-1"
						/>
					)}
				</div>
				<FontAwesomeIcon
					icon={faForwardStep}
					size="xl"
					style={{ color: "#B2B2B2" }}
					onClick={() => handleSkipToNext()}
					onMouseEnter={(e) => {
						e.target.style.color = "#ffffff";
					}}
					onMouseLeave={(e) => {
						e.target.style.color = "#B2B2B2";
					}}
					className="cursor-pointer w-7 h-7"
				/>
			</div>
			<div className="flex flex-row flex-nowrap gap-4 w-full">
				<MusicDurationController
					time={timeIntoSong}
					customClass={"time-left"}
					increment={true}
				/>
				<input
					type="range"
					name="progress"
					id="progress"
					min="0"
					max={totalTime}
					value={timeIntoSong}
					step={1}
					className="progress-slider"
					onChange={(e) => {
						handleTimePosition(e);
					}}
				/>
				<MusicDurationController
					time={totalTime}
					customClass={"time-right"}
					increment={false}
				/>
			</div>
		</div>
	);
};

export default MusicController;
