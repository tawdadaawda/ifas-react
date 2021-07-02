import React from "react";
import { Link } from "react-router-dom";
import similer from "./image/search/p_search_btn1.png";
import different from "./image/search/p_search_btn2.png";
import "./App.css";

export const search = (props) => {
  return (
    <div>
      <ul>
        <div>
          <Link to="/select">
            <img src={similer} />
          </Link>
          <Link to="/select">
            <img src={different} />
          </Link>
        </div>
      </ul>
    </div>
  );
};
