import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "5bfbaaa74a5829b7d1a1568879acd71f",
    language: "ko-KR",
  },
});

export default instance;
