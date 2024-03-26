import React, { useEffect, useState } from "react";

const MusicDurationController = ({ time, customClass, increment }) => {
	const [localTimeCounter, setLocalTimeCounter] = useState(time);

	useEffect(() => {
		setLocalTimeCounter(time);
	}, [time]);

	function millisecondToMinutesAndSeconds(milliseconds) {
		var minutes = Math.floor(milliseconds / 60000);
		var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}

	return (
		<p key={time} className={`${customClass} text-sm font-light w-7`}>
			{millisecondToMinutesAndSeconds(localTimeCounter)}
		</p>
	);
};

export default MusicDurationController;
