import React from "react";
import Nas from "../../../../assets/images/nas.jpg";

const AlbumCovers = ({ imgSrc, name, artists }) => {
	return (
		<div className="flex flex-col items-start gap-2 flex-shrink-0">
			<img
				src={imgSrc ? imgSrc : Nas}
				alt=""
				className="w-40 h-40 rounded-lg"
			/>
			<div className="flex flex-col gap-1">
				<h1 className="text-default-font text-md">
					{name ? name : "For the mind"}
				</h1>
				<div className="flex flex-row gap-1 text-nowrap">
					{artists ? (
						artists.map((artist) => {
              return (
							<a className="text-secondary-font text-sm">{artist.name}, </a>
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

export default AlbumCovers;
