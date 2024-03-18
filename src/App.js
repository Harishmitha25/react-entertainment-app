import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Favourites from "./pages/Favourites";
import Search from "./pages/Search";
import Details from "./pages/Details";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Wrapper from "./pages/Wrapper";
import { SearchProvider } from "./utils/SearchContext";

function App() {
  return (
    <div className="App">
        <SearchProvider>
        <Router>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Wrapper>
        </Router>
      </SearchProvider>
    </div>
  );
}

export default App;
