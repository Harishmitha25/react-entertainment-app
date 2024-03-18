export const toggleFavourite = (media, callback) => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const index = favourites.findIndex((fav) => fav.imdbID === media.imdbID);
  
    if (index !== -1) {
      favourites.splice(index, 1);
    } else {
      favourites.push(media);
    }
  
    localStorage.setItem("favourites", JSON.stringify(favourites));
  
    // Optional callback function to update state if provided
    if (callback) {
      callback(favourites);
    }
  };
  