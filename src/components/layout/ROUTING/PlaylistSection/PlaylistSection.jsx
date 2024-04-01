import React, { useEffect, useState } from "react";
import ProfileTop from "../../../ProfileTop/ProfileTop.jsx";
import { useParams } from "react-router-dom";
import { GetPlaylist, GetUser } from "../../../../lib/API/getInfo.js";
import { PlaylistItemsDisplay } from "./PlaylistItemsDisplay/PlaylistItemsDisplay.jsx";

const PlaylistSection = ({ additionalClass }) => {
	const [playlist, setPlaylist] = useState({});
	const [playlistName, setPlaylistName] = useState("");
	const [playlistTracks, setPlaylistTracks] = useState([{}]);
	const [playlistOwner, setPlaylistOwner] = useState({});
	const [PlaylistDescription, setPlaylistDescription] = useState("");
	const [PlaylistImage, setPlaylistImage] = useState("");
	const [PlaylistTrackNumber, setPlaylistTrackNumber] = useState(0);
	const [PlaylistFollowers, setPlaylistFollowers] = useState(0);
	const [PlaylistIsPublic, setPlaylistIsPublic] = useState(false);
	const [PlaylistCreator, setPlaylistCreator] = useState({});
	const [PlaylistCreatorPicture, setPlaylistCreatorPicture] = useState("");
	let { id } = useParams();

	useEffect(() => {
		GetPlaylist(id).then((response) => {
			setPlaylist(response);
		});
	}, [id]);

	useEffect(() => {
		if (!playlist.name) return;
		setPlaylistName(playlist.name);
		setPlaylistOwner(playlist.owner);
		setPlaylistDescription(playlist.description);
		setPlaylistImage(playlist.images[0].url);
		setPlaylistTrackNumber(playlist.tracks.total);
		setPlaylistFollowers(playlist.followers.total);
		setPlaylistIsPublic(playlist.public);
		setPlaylistCreator(playlist.owner);
		setPlaylistTracks(playlist.tracks.items);
		console.log(playlist);
	}, [playlist]);

	useEffect(() => {
		if (!PlaylistCreator.display_name) return;
		GetUser(PlaylistCreator.id).then((response) => {
			setPlaylistCreatorPicture(response.images[0].url);
		});
	}, [PlaylistCreator]);

	return (
		<div
			className={`w-full flex p-4 flex-col rounded-2xl overflow-hidden bg-overlay-black ${additionalClass}`}>
			<ProfileTop addClass={"justify-end"} />
			<div className="ml-8">
				<div className="flex flex-row">
					<img src={PlaylistImage} alt="playlist" className="w-48 h-48 rounded-md" />
					<div className="flex flex-col justify-end items-start gap-3 p-4 pb-0">
						<h4 className="text-sm">
							{PlaylistIsPublic ? "Public Playlist" : "Private Playlist"}
						</h4>
						<h1 className="text-8xl font-bold text-white">{playlistName}</h1>
						<p className="text-white">{PlaylistDescription}</p>
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-2">
								<img
									src={PlaylistCreatorPicture}
									alt=""
									className="w-8 w-8 rounded-full"
								/>
								<h3 className="text-white font-bold ">
									{PlaylistCreator.display_name}
								</h3>
							</div>
							<p>•</p>
							<p className="text-white font-medium">
								{PlaylistTrackNumber} songs
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="spoti-vertial-scrollbar flex flex-col overflow-y-scroll mt-4">
				{playlist.name ? (
					playlistTracks
						.filter((track) => track && track.track && track.track.is_playable) // Filter tracks where track exists and is_playable is true
						.map((track, index) => (
							<PlaylistItemsDisplay
								Track={track}
								index={index}
								playlistUri={playlist.uri}
								key={track.track.id}
							/>
						))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default PlaylistSection;
