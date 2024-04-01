import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faVolumeXmark,
	faVolumeOff,
	faVolumeLow,
	faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { volumeControl } from "../../../../../lib/API/getInfo";
import './MusicSecondaryController.css';

const MusicSecondaryController = ({volumeProp}) => {
	const [volume, setVolume] = useState(volumeProp);
    const [lastVolume, setLastVolume] = useState(volumeProp);
	const handleVolume = (e) => {
		setVolume(e.target.value);
        console.log(volume, "volume");
        volumeControl(Math.round(e.target.value));
	};
    const handleMute = () => {
        if (volume > 0) {
            setVolume(0);
            setLastVolume(volume);
            document.querySelector("#volume").value = 0;
            volumeControl(0);
        } else {
            setVolume(lastVolume);
            document.querySelector("#volume").value = volumeProp;
            volumeControl(lastVolume);
        }
    }
	useEffect(() => {
        const input = document.querySelector("#volume");
		input.value = volume;
	}, [volume]);
	return (
		<div className="flex flex-1 flex-row justify-end items-center gap-4 pr-4">
			<div className="flex flex-row justify-start w-5">
				<FontAwesomeIcon
					icon={
						volume == 0
							? faVolumeXmark
							: volume < 50
							? faVolumeLow
							: volume >= 50
							? faVolumeHigh
							: faVolumeOff
					}
					size="xl"
					style={{ color: "#ffffff" }}
					onClick={() => handleMute()}
					className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
				/>
			</div>
			<input
				type="range"
				name="volume"
				id="volume"
                min="0"
				max="100"
				defaultValue={volume}
				step={1}
				onClick={(e) => handleVolume(e)}
				className="w-36 volume-slider"
			/>

		</div>
	);
};

export default MusicSecondaryController;
