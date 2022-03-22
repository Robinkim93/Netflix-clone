import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const debounceSearchTerm = useDebounce(query.get("q"), 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (debounceSearchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${debounceSearchTerm}`
      );
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("errer", error);
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageUrl}
                    alt="movie Image"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            Your search for "{debounceSearchTerm}" did not have any matches.
          </p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
          </ul>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
export default SearchPage;
