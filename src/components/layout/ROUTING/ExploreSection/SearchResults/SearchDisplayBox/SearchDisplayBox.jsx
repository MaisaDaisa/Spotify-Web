import React from "react";
import "./SearchDisplayBox.css";
import TrackCoverDisplay from "./../../../../../TrackCovers/TrackCovers.jsx";
import ArtistDisplayCover from "./../../../../../ArtitstDisplayCover/ArtistDisplayCover.jsx";
import PlaylistDisplayCover from "./../../../../../PlaylistDisplayCover/PlaylistDisplayCover.jsx";

const SearchDisplayBox = ({ name, results }) => {
	function FirstLetterToUpper(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

  if (name === 'playlists') {
    console.log(results);
  }

	return (
    <div className="flex flex-wrap flex-row justify-between gap-6 mt-4">
      <h1 className="text-2xl font-bold">{FirstLetterToUpper(name)}</h1>
      <div className={`${name === 'artists' ? 'search-display-results-1row ' : 'search-display-results-2row '}  pb-10 overflow-x-auto w-full spoti-horizontal-scrollbar`}>
        {name === "tracks" ? (
          results.map((item, index) => {
            return (
              <TrackCoverDisplay
                key={item.id}
                imgSrc={item.album.images[0].url}
                name={item.name}
                artists={item.artists} 
                uri={item.id}
                type={item.type}
              />
            );
          })
        ) : name === "albums" ? (
          results.map((album, index) => {
            return (
              <TrackCoverDisplay
                key={album.id}
                imgSrc={album.images[0].url}
                name={album.name}
                artists={album.artists}
                uri={album.id}
                type={album.type}
              />
            );
          })
        ) : name === "artists" ? (
          results.map((artist) => {
            return (
              <ArtistDisplayCover
                key={artist.id}
                uri={artist.uri}
                name={artist.name}
                imgSrc={artist.images}
              />
            );
          })
        ) : name === "playlists" ? (
          results.map((playl) => {
            return (
              <PlaylistDisplayCover
                key={playl.id}
                name={playl.name}
              />
            )
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
  
};

export default SearchDisplayBox;
