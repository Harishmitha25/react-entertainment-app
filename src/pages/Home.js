import React, { useEffect, useRef, useState } from "react";
import CustomCard from "../components/CustomCard";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toggleFavourite } from "../utils/toggleFavourite";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../utils/SearchContext";

function Home() {
  const apiCalled = useRef(false);
  const prevSearchText = useRef("");
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [favourite, setFavourite] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("favourites"));
    return storedData ? storedData : [];
  });
  const navigate = useNavigate();
  const { searchText } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF", // Change the primary color to your desired color
      },
    },
  });

  // useEffect(() => {
  //   getDataFromApi("friends");
  // }, []);

  useEffect(() => {
    console.log(searchText);
    // const query = apiCalled.current ? searchText : "friends";
    const query = searchText.trim() ? searchText : "friends";
    getDataFromApi(query);
  }, [searchText]);

  // useEffect(() => {
  //   fetch("http://www.omdbapi.com/?s=friends&type=series&apikey=3df2799b")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSeriesList(data.Search);
  //     });
  // }, []);

  const handleChange = (searchValue) => {
    getDataFromApi(searchValue);
    if (searchValue === "") {
      getDataFromApi("friends");
    }
  };

  const getDataFromApi = (searchValue) => {
    console.log("sdsssssssssssssssss" + movieList);
    // if (apiCalled.current && searchValue === "friends") {
    //   // Prevent refetching "friends" on initial load if already done.
    //   return;
    // }
    
    console.log(searchText);
    // if (searchValue === "friends") {
    //   apiCalled.current = true;
    // }
    const fetchNeeded = searchValue !== prevSearchText.current || !apiCalled.current;
    prevSearchText.current = searchValue; // Update the previous search text
  
    if (!fetchNeeded) {
      setLoading(false);
      return;
    }
  
    // Mark that the initial fetch has occurred
    if (!apiCalled.current) {
      apiCalled.current = true;
    }
    
    // checkInitialRender(searchText);
    // apiCalled.current = true;
    setLoading(true);
    setError(null);

    const moviesPromise = fetch(
      `http://www.omdbapi.com/?s=${searchValue}&type=movie&plot=full&apikey=3df2799b`
    ).then((res) => res.json());
    const seriesPromise = fetch(
      `http://www.omdbapi.com/?s=${searchValue}&type=series&apikey=3df2799b`
    ).then((res) => res.json());

    Promise.all([moviesPromise, seriesPromise])
      .then(([moviesData, seriesData]) => {
        if (moviesData.Response === "True") {
          setMovieList(moviesData.Search);
          setError(null);
        } else {
          setMovieList([]);
        }

        if (seriesData.Response === "True") {
          setSeriesList(seriesData.Search);
          setError(null);
        } else {
          setSeriesList([]);
        }
      })
      .catch((error) => {
        // Catch any errors during the fetch
        setError("Failed to load data");
        console.error("API fetch error:", error);
      })
      .finally(() => {
        // Stop loading indication
        setLoading(false);
      });

    const checkInitialRender = () => {
      if (!apiCalled.current && searchText === "") {
        apiCalled.current = true;
      }
      return apiCalled.current;
    };
    // fetch(
    //   `http://www.omdbapi.com/?s=${searchValue}&type=movie&plot=full&apikey=3df2799b`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // data.Search.forEach(item => {
    //     //   item.favourite = item.favourite || false;
    //     // });
    //     setMovieList(data.Search);
    //     console.log(data.Search);
    //     console.log(movieList);
    //   })
    //   .catch((error) => setError("Failed to load movies"))
    //   .finally(() => setLoading(false));

    // fetch(
    //   `http://www.omdbapi.com/?s=${searchValue}&type=series&apikey=3df2799b`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setSeriesList(data.Search);
    //     console.log(data.Search);
    //     console.log(seriesList);
    //     // data.Search.forEach(item => {
    //     //   item.favourite = item.favourite || false;
    //     // });
    //   })
    //   .catch((error) => setError("Failed to load movies"))
    //   .finally(() => setLoading(false));
  };

  const handleClick = (media) => {
    navigate(`/details/${media.imdbID}`); // or navigate(`/details/${media.imdbID}`);
  };

  const handleToggle = (media) => {
    toggleFavourite(media, setFavourite);
  };
  if (error) return <p>Error loading data!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <ThemeProvider theme={theme}>
      {/* Wrap your entire application with ThemeProvider */}
      <AppBar position="static">
        {/* <Typography variant="h6" noWrap component="div">
          Home
        </Typography>
        <SearchIcon></SearchIcon>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => handleChange(e.target.value)}
        /> */}

        <div className="card-container">
          {/* Hello from Movie List */}
          <div className="movies">
            {movieList &&
              movieList.map((movie) => (
                <div key={movie.imdbID}>
                  {movie && (
                    <CustomCard
                      media={movie}
                      handleToggle={handleToggle}
                      isFavourite={favourite.some(
                        (fav) => fav.imdbID === movie.imdbID
                      )}
                      handleClick={handleClick}
                    ></CustomCard>
                  )}
                </div>
              ))}
          </div>

          <div className="series">
            {seriesList &&
              seriesList.map((series) => (
                <div key={series.imdbID}>
                  {series && (
                    <CustomCard
                      media={series}
                      handleToggle={handleToggle}
                      handleClick={handleClick}
                      isFavourite={favourite.some(
                        (fav) => fav.imdbID === series.imdbID
                      )}
                    ></CustomCard>
                  )}
                </div>
              ))}
          </div>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default Home;
