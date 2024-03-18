import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import CustomCard from "../components/CustomCard";
import { toggleFavourite } from "../utils/toggleFavourite";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favourites);
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2, // px if it reaches 1100px then to 2 cols
    700: 1,
  };

  const handleToggle = (media) => {
    toggleFavourite(media, setFavourites);
  };
  
  return (
    <div>
      Favourites
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {favourites.map((fav) => (
          <CustomCard key={fav.imdbID} isFavourite media={fav} handleToggle={handleToggle}></CustomCard>
        ))}
      </Masonry>
    </div>
  );
}

export default Favourites;
