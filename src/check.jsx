import React from "react";
import { Link } from "react-router-dom";
import color from "./image/trying_on/colors1.png";
import home from "./image/trying_on/home.png";
import cart from "./image/trying_on/cart.png";
import hanger from "./image/trying_on/hanger.png";
import "./App.css";

export const check = (props) => {
  const image = props.location.state.image;

  return (
    <div>
      <ul>
        <div>
          <Link to="/property1">
            <img src={color} width="50" height="50" alt="" />
          </Link>
          <Link to="/home">
            <img src={home} width="50" height="50" alt="" />
          </Link>
          <Link to="/search">
            <img src={hanger} width="50" height="50" alt="" />
          </Link>
          <Link to="/purchase">
            <img src={cart} width="50" height="50" alt="" />
          </Link>
          <img src={image} className="image-fitting" alt="" />
        </div>
      </ul>
    </div>
  );
};
