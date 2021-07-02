import React from "react";
import {Link } from 'react-router-dom';
import logo from "./assets/img/logo/logo.svg";

export const top = (props)=>  {
    return (
<<<<<<< HEAD
    <div>
=======
    <div class="bg-image">
>>>>>>> 17b6c426d403d8c4d08db15cc97442f086dac66c
        <div class="wrapper home">
            <div class="card">
            <div class="card-content">
                <div class="logo">
                    <img src={logo} alt=""/>
                </div>
                <div class="text_container">
                <h2 class="title">バーチャル試着</h2>
                <h3 class="subtitle">3秒で新しい自分に大変身</h3>
                </div>
                <div class="btn_container">
                    <button class="btn">
                        <Link to='/Choose'>着てみる</Link>
                    </button>
                </div>
            </div>
            </div>
        </div>

    </div>);
}