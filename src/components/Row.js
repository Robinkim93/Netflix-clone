import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>

      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={6}
        >
          <div id={id} className="row__posters">
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  alt={`${movie.name} Poster`}
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}

            <div className="slider__arrow-right">
              <div
                className="arrow"
                onClick={() => {
                  document.getElementById(id).scrollLeft +=
                    window.innerWidth + 80;
                }}
              >
                {">"}
              </div>
            </div>
          </div>
          ``
        </Swiper>
      </div>

      {modalOpen && (
        <MovieModal
          {...movieSelected}
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )}
    </section>
  );
}

export default Row;
