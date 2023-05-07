import React from 'react';
import cover from '../../Assets/cover.jpg';
import '../Banner/Banner.css';
const Banner = () => {
  return (
    <div className="cover">
      <img src={cover} alt="" />
    </div>
  );
};

export default Banner;
