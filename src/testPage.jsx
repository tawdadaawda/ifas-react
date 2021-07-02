import React from "react";
import { Link } from "react-router-dom";
import data from "./assets/db/clothes";

export const testPage = (props) => {
  const getImage = (imagePath) => {
    return require(imagePath);
  };

  return (
    <div class="bg-image">
      <div class="wrapper favorite">
        <div class="main">
          <h2 class="title">好きな服を選んでください</h2>
          <ul class="list">
            {data.products.map((product, index) => {
              return (
                <li className="item">
                  <div className="content">
                    <Link
                      to={{
                        pathname: "/choose",
                        state: { product: product },
                      }}
                    >
                      <img src={product.path} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
