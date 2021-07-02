import React, { useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import data from "./assets/db/clothes";
// icon
import homeIcon from "./assets/img/icons/home.svg";
import hangerIcon from "./assets/img/icons/hanger.svg";
import cartIcon from "./assets/img/icons/cart.svg";

import bg from "./assets/img/take_dummy.jpg";

export const Fitting = (props) => {
  const selectedProduct = props.location.state.product;
  const image = props.location.state.image;

  return (
    <div>
=======
import { Link } from 'react-router-dom'
// image
import image1 from "./assets/img/clothes/019360_1-removebg-preview.png"
import image2 from "./assets/img/clothes/019368_1-removebg-preview.png"
import image3 from "./assets/img/clothes/019384_1-removebg-preview.png"
import image4 from "./assets/img/clothes/019393_1-removebg-preview.png"
import image5 from "./assets/img/clothes/019402_1-removebg-preview.png"

// icon
import homeIcon from "./assets/img/icons/home.svg"
import hangerIcon from "./assets/img/icons/hanger.svg"
import cartIcon from "./assets/img/icons/cart.svg"

import bg from "./assets/img/take_dummy.jpg"
import { promotion } from "./promotion";


export const Fitting = (props) => {

  const imageList = [
    { "nextLink": "/select", "path": image1, "isActive": false },
    { "nextLink": "/select", "path": image2, "isActive": false },
    { "nextLink": "/select", "path": image3, "isActive": true },
    { "nextLink": "/select", "path": image4, "isActive": false },
    { "nextLink": "/select", "path": image5, "isActive": false }
  ]

  return (
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
      <div class="wrapper fitting">
        <div class="bg">
          <img src={bg} alt="" />
        </div>
        <div class="main">
<<<<<<< HEAD
          <div class="stroke">
            <img src={image} alt="" />
          </div>
=======
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
          <ul class="colors">
            <li class="item blue active"></li>
            <li class="item black"></li>
            <li class="item white"></li>
            <li class="item yellow"></li>
          </ul>
          <ul class="icons">
            <li class="icon home">
<<<<<<< HEAD
              <Link to="/">
                <img src={homeIcon} alt="" />
              </Link>
=======
              <img src={homeIcon} alt="" />
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
            </li>
            <li class="icon hanger">
              <img src={hangerIcon} alt="" />
            </li>
            <li class="icon cart">
<<<<<<< HEAD
              <Link
                to={{
                  pathname: "/promotion",
                  state: { product: selectedProduct },
                }}
              >
=======
              <Link to={'/promotion'}>
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
                <img src={cartIcon} alt="" />
              </Link>
            </li>
          </ul>
<<<<<<< HEAD

          <p class="interaction">タップすると試着できます</p>
          <ul class="clothes">
            {data.products.map((product, index) => {
              const className =
                product.productID === selectedProduct.productID
                  ? "clothe active"
                  : "clothe";
              return (
                <li className={className}>
                  <Link
                    to={{
                      pathname: "/select",
                      state: { product: product },
                    }}
                  >
                    <img src={product.path} />
                  </Link>
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
          <p class="interaction">
            タップすると試着できます
          </p>
          <ul class="clothes">
            {imageList.map((image, index) => {
              if (image.isActive === true) {
                return (
                  <li className="clothe active">
                    <img src={image.path} />
                  </li>
                )
              }
              else {
                return (
                  <li className="clothe">
                    <img src={image.path} />
                  </li>
                )
              }
            })}
          </ul>
        </div>
    </div>);
}
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
