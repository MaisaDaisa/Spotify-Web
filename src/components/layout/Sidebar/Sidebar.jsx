import React, { useState, useEffect } from "react";
import SidebarNavLinks from "./SidebarNavLinks/SidebarNavLinks";
import { faCompass, faStar } from "@fortawesome/free-regular-svg-icons";
import SideBarPlaylists from "./SideBarPlaylists/SideBarPlaylists";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { fetchUserPlaylists } from "../../../lib/API/getInfo.js";
import { Link } from "react-router-dom";

const Sidebar = ({ additionalClass }) => {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		fetchUserPlaylists().then((response) => {
			setAlbums(response.items);
		});
	}, []);

	return (
		<div
			className={`flex flex-col shrink-0 w-[280px] gap-6 bg-overlay-black overflow-hidden rounded-2xl p-4 ${additionalClass}`}>
			<div className="flex flex-col items-start gap-3">
				<Link to={"/"}>
					<SidebarNavLinks icon={faBuilding} title={"Home"} />
				</Link>
				<Link to={"/explore"}>
					<SidebarNavLinks icon={faCompass} title={"Explore"} />
				</Link>
				<SidebarNavLinks icon={faStar} title={"Favorites"} />
			</div>
			<h1 className="text-default-font text-xl font-lg mt-4">Your library</h1>
			<div className="spotify-vertical-scrollbar flex flex-col w-full gap-3 items-start flex-nowrap overflow-y-scroll mt-4">
				{albums.map((playlist) => {
					return (
						<Link to={`/playlist/${playlist.id}`} key={playlist.id}>
							<SideBarPlaylists
								playlistKey={playlist.id} // Use playlistKey instead of key
								imgSrc={playlist.images[0].url}
								name={playlist.name}
								id={playlist.id}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
