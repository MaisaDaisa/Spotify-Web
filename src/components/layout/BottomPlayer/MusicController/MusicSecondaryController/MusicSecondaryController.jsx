import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faVolumeXmark,
	faVolumeOff,
	faVolumeLow,
	faVolumeHigh,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { GetAvailableDevices, volumeControl } from "../../../../../lib/API/getInfo";
import './MusicSecondaryController.css';
import { ToggleShuffle } from "./../../../../../lib/API/getInfo";

const MusicSecondaryController = ({}) => {
	const [shuffle, setShuffle] = useState(false);
	const [volume, setVolume] = useState(0);
    const [lastVolume, setLastVolume] = useState(0);
	const handleVolume = (e) => {
		setVolume(e.target.value);
        console.log(volume, "volume");
        volumeControl(Math.round(e.target.value));
	};

	function handleShuffle(){
		ToggleShuffle(!shuffle);
		setShuffle(!shuffle);
		console.log(shuffle);
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
		GetAvailableDevices().then((data) => {
			const activeDevice = data.devices.filter((device) => device.is_active);
			const input = document.querySelector("#volume");
			setVolume(activeDevice[0].volume_percent);
			input.value = activeDevice[0].volume_percent;
		});
	}, []);

	useEffect(() => {
		const input = document.querySelector("#volume");
		input.value = volume;
	}, [volume]);
	
	return (
		<div className="flex flex-1 flex-row justify-end items-center gap-4 pr-4">
			<FontAwesomeIcon icon={faShuffle} size="xl" style={{color: ( shuffle === false ? "#ffffff" : '#1db954')}}
			className="cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
			onClick={handleShuffle}/>
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
				defaultValue={0}
				step={1}
				onClick={(e) => handleVolume(e)}
				className="w-36 volume-slider"
			/>

		</div>
	);
};

export default MusicSecondaryController;
