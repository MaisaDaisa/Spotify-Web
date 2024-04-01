import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FilterClicks from "./FilterClicks/FilterClicks";

const SearchBar = ({ addClass, searchQueryFunc }) => {
  const [filters, setFilters] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    const searchQuery = document.querySelector(".explore-search").value;
    searchQueryFunc(searchQuery, getFilters());
  }


  useEffect(() => {
    setFilters([
      { name: "Album", selected: true },
      { name: "Artist", selected: true },
      { name: "Playlist", selected: true },
      { name: "Track", selected: true },
    ]);
  }, []);

  function handleFilters(filterName) {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.name === filterName
          ? { ...filter, selected: !filter.selected }
          : filter
      )
    );
  }

  function getFilters() {
    return filters
      .filter((filter) => filter.selected)
      .map((filter) => filter.name.toLowerCase());
  }
  

  

  

  return (
    <div className={`flex-col items-center mt-4 ${addClass}`}>
      <form
        className="flex flex-nowrap search-bar w-full ml-3 relative items-center"
        onSubmit={(e) => handleSearch(e)}
      >
        <button type="submit" className="absolute left-4">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <input
          type="text"
          className="explore-search p-2 pl-12 text-lg bg-secondary-gray text-default-font rounded-full w-full"
          placeholder="search"
        />
      </form>
      <div className="flex flex-row gap-4 p-4">
        {filters.map((filter, index) => (
          <FilterClicks
          key={index}
          name={filter.name}
          selected={filter.selected}
          func={handleFilters}
        />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
