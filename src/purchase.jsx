import React from "react";
import { Link } from "react-router-dom";
import image1 from "./image/clothes/1.jpg";
import button from "./image/promotion/p_promotion_btn1.png";

export const purchase = (props) => {
  const imageList = [{ nextLink: "/fitting", path: image1 }];

  return (
    <div>
      <h1> Test-T </h1>
      <ul>
        {imageList.map((image, index) => {
          return (
            <div>
              <li>
                <img src={image.path} />
                <ul>
                  <li>テキストが入ります</li>
                  <li>テキストが入ります</li>
                </ul>
                ￥1,000
              </li>
              <Link to="/complete">
                <img src={button} />
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
