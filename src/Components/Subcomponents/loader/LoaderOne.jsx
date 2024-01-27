import React, { useEffect } from 'react';
import './LoaderOne.css';

const LoaderOne = () => {

  return (
    <div className="loader-container d-flex flex-column">
      <div>
        <img src="/icons/loading-black-logo.svg" alt="" />
      </div>
      <div>
        <div className="loader"></div>
      </div>
      
    </div>
  );
};

export default LoaderOne;
