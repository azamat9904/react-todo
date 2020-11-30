import React from 'react';

import mainLoaderSrc from '../../assets/img/main-loader.svg';

import "./Loading.scss";

const Loading = () => {
    return <div className="loading">
        <img src={mainLoaderSrc} alt="Loading" />
    </div>
}

export default Loading;