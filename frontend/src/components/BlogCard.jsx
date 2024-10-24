import React from "react";
import FeaturedImage from '../assets/FeaturedImage.png'
import { Link } from "react-router-dom";

const BlogCard = ({ 
    size
}) => {
  return (
    <Link to="/"
      className={`${
        size === "big" ? "w-3/4" : size === "md" ? "mb-12 w-full flex items-center border border-[#EBEBEB] shadow-[0px_2px_11pxPrgva(0,0,0,0.03)]" : "w-auto"
      }`}
    >
      <img src={FeaturedImage} alt="" className={`${size === 'big' ? 'w-full h-4/6' : size === 'md' ? 'h-80 w-96' : 'w-full h-64'} object-cover`} />
      <div className={`${size === "md" ? "p-12" : "my-6"}`}>
        <h2
          className={`font-bold ${
            size === "big" ? "text-4xl" : size === "md" ? 'text-2xl' : 'text-xl'
          }`}
        >
          4 Reasons Why Your Café Should Sell Cold Brew Coffee
        </h2>
        <p
          className={`text-[#493738] mt-6 ${
            size === "sm" ? "hidden" : "block"
          }`}
        >
          Cold brew coffee is perfect drink for hot summer days but why you
          should definitely sell it in your café? Here are my four reasons why
          every café should sell cold brew coffee throughout the year!
        </p>
        <p className="text-[#493738] mt-6">4 Jan, 2023</p>
      </div>
    </Link>
  );
};

export default BlogCard;
