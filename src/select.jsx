import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import { Link } from 'react-router-dom'
import image1 from "./assets/img/clothes/019360_1-removebg-preview.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c

export const select = (props) => {
    const product = props.location.state.product;

<<<<<<< HEAD
  return (
    <div>
      <div class="wrapper select">
        <div class="main">
          <button class="scroll_btn left">
            <FontAwesomeIcon icon="caret-left" className="icon" />
          </button>
          <div class="card">
            <div class="card-content">
              <div class="text_container">
                <h2 class="clothes_name">{product.productName}</h2>
                <h3 class="price">{product.price}</h3>
              </div>
              <ul class="colors">
                <li class="item blue active"></li>
                <li class="item black"></li>
                <li class="item white"></li>
                <li class="item yellow"></li>
              </ul>
              <img src={product.path} alt="" />
              
                <Link
                  to={{
                    pathname: "/takePhoto",
                    state: { product: product },
                  }}
                >
                  <button class="btn">着てみる</button>
                </Link>
            </div>
          </div>
          <button class="scroll_btn right">
            <FontAwesomeIcon icon="caret-right" className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
=======
export const select = (props) => {

    const imageList = [
        { "nextLink": "/takePhoto", "path": image1 },
    ]

    return (
        <div class="bg-image">
            <div class="wrapper select">
                <div class="main">
                    <button class="scroll_btn left">
                        <FontAwesomeIcon icon="caret-left"  className="icon"/>
                    </button>
                    {imageList.map((image, index) => {
                        return(
                            <div class="card">
                                <div class="card-content">
                                    <div class="text_container">
                                        <h2 class="clothes_name">test-T</h2>
                                        <h3 class="price">￥1,000</h3>
                                    </div>
                                    <ul class="colors">
                                        <li class="item blue active"></li>
                                        <li class="item black"></li>
                                        <li class="item white"></li>
                                        <li class="item yellow"></li>
                                    </ul>
                                    <img src={image.path} alt="" />
                                    <button class="btn"><Link to={image.nextLink}>着てみる</Link></button>
                                </div>
                            </div>
                        )
                    })}
                    <button class="scroll_btn right">
                        <FontAwesomeIcon icon="caret-right" className="icon"/>
                    </button>
                </div>
            </div>
        </div>);
}
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
