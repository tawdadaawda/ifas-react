import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import data from "./assets/db/clothes";

export const choose = (props) => {

  return (
    <div>
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
                        pathname: "/select",
                        state: { product: product },
                      }}
                    >
                      <img src={product.path} alt="" />
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
=======
import { Link } from 'react-router-dom'

import image1 from "./assets/img/clothes/019360_1-removebg-preview.png"
import image2 from "./assets/img/clothes/019368_1-removebg-preview.png"
import image3 from "./assets/img/clothes/019384_1-removebg-preview.png"
import image4 from "./assets/img/clothes/019393_1-removebg-preview.png"
import image5 from "./assets/img/clothes/019402_1-removebg-preview.png"
import image6 from "./assets/img/clothes/000048_1-removebg-preview.png"


export const choose = (props) => {

    const imageList = [
        { "nextLink": "/select", "path": image1 },
        { "nextLink": "/select", "path": image2 },
        { "nextLink": "/select", "path": image3 },
        { "nextLink": "/select", "path": image4 },
        { "nextLink": "/select", "path": image5 },
        { "nextLink": "/select", "path": image6 }
    ]

    return (
        <div class="bg-image">
            <div class="wrapper favorite">
                <div class="main">
                    <h2 class="title">好きな服を選んでください</h2>
                    <ul class="list">
                        {imageList.map((image, index) => {
                            return (
                                <li className="item">
                                    <div className="content">
                                        <Link to={image.nextLink}><img src={image.path} /></Link> 
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
        </div>);
}
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
