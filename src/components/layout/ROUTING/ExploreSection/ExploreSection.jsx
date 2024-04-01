import React, { useEffect } from "react";
import ProfileTop from "../../../ProfileTop/ProfileTop";
import SearchBar from "../../../SearchBar/SearchBar";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import useNavigate
import MainExplore from "./MainExplore/MainExplore";
import SearchResults from "./SearchResults/SearchResults";

const ExploreSection = ({ additionalClass }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  function initSearch(query, filters) {
    if (query === "") {
      navigate("/explore"); // Navigate to the main explore page if the query is empty
    } else {
      let filtersQuery = "";
      if (Array.isArray(filters)) {
        console.log("array");
        filtersQuery = filters.join("%2C");
      } else 
      if (filters === "album" || filters === "artist" || filters === "playlist" || filters === "track") {
        filtersQuery = filters;
      } 
      navigate(`/explore/${query}/${filtersQuery}`); // Navigate to the search results page
    }
  }

  return (
    <div className={`w-full flex p-4 flex-col rounded-2xl overflow-hidden bg-overlay-black ${additionalClass}`}>
      <ProfileTop addClass={"justify-between"}>
        <SearchBar addClass={"w-1/2"} searchQueryFunc={initSearch} />
      </ProfileTop>
      <Routes>
        <Route path="/:query/:filters/:limit?/:market?/:offset?" element={<SearchResults />} />
        <Route path="/" element={<MainExplore />} />
      </Routes>
    </div>
  );
};

export default ExploreSection;
