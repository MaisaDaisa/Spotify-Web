import React from "react";
import Nas from "../../assets/images/nas.jpg";

const AlbumDisplayCover = ({ imgSrc, name, artists, uri }) => {

	function handleClick () {
		console
	}
	return (
		<div className="flex flex-col items-start gap-2 flex-shrink-0 w-[160px]">
			<img
				src={imgSrc ? imgSrc : Nas}
				alt=""
				className="w-40 h-40 rounded-lg"
			/>
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

export default AlbumDisplayCover;
