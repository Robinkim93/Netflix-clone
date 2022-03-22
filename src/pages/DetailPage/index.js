import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../components/MovieModal/MovieModal.css";

function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      setMovie(request.data);
    }
    fetchData();
  }, [movieId]);
  console.log(movie);
  if (!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="Movie Poster"
      />
    </section>
  );
}
export default DetailPage;
