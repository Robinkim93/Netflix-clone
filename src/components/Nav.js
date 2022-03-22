import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/300px-Netflix_2015_logo.svg.png"
        onClick={() => (window.location.href = "/Netflix-clone")}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
      />
      <img
        alt="User logged"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6q8XYXGI3yhiOJy1HG1vR1JSShbgw9a47dA&usqp=CAU"
        className="nav__avatar"
      />
    </nav>
  );
}

export default Nav;
