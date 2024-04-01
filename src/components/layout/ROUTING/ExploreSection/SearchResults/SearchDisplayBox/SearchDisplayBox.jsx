import React from "react";
import "./SearchDisplayBox.css";
import TrackCoverDisplay from "./../../../../../TrackCovers/TrackCovers.jsx";
import ArtistDisplayCover from "./../../../../../ArtitstDisplayCover/ArtistDisplayCover.jsx";
import PlaylistDisplayCover from "./../../../../../PlaylistDisplayCover/PlaylistDisplayCover.jsx";
import AlbumDisplayCover from "../../../../../AlbumDisplayCover/AlbumDisplayCover";

const SearchDisplayBox = ({ name, results }) => {
    function FirstLetterToUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let displayContent;

    if (name === "tracks") {
        displayContent = results.map((item) => (
            <TrackCoverDisplay
                key={item.id}
                imgSrc={item.album.images[0].url}
                name={item.name}
                artists={item.artists}
                uri={item.uri}
            />
        ));
    } else if (name === "albums") {
        displayContent = results.map((album) => (
            <AlbumDisplayCover
                key={album.id}
                imgSrc={album.images[0].url}
                name={album.name}
                artists={album.artists}
                uri={album.uri}
            />
        ));
    } else if (name === "artists") {
        displayContent = results.map((artist) => (
            <ArtistDisplayCover
                key={artist.id}
                uri={artist.uri}
                name={artist.name}
                imgSrc={artist.images}
            />
        ));
    } else if (name === "playlists") {
        displayContent = results.map((playl) => (
            <PlaylistDisplayCover
                key={playl.id}
                name={playl.name}
                id={playl.id}
                imgSrc={playl.images[0].url}
            />
        ));
    } else {
        displayContent = <div></div>;
    }

    return (
        <div className="flex flex-wrap flex-row justify-between gap-6 mt-4">
            <h1 className="text-2xl font-bold">{FirstLetterToUpper(name)}</h1>
            <div className={`${name === 'artists' || results.length < 10 ? 'search-display-results-1row' : 'search-display-results-2row'} pb-10 overflow-x-auto w-full spoti-horizontal-scrollbar`}>
                {displayContent}
            </div>
        </div>
    );
};

export default SearchDisplayBox;
