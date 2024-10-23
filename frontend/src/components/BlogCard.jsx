import React from "react";

const BlogCard = ({ 
    size
}) => {
  return (
    <div
      className={`${
        size === "big" ? "w-3/4" : size === "md" ? "mb-12 w-full flex items-center border border-[#EBEBEB] shadow-[0px_2px_11pxPrgva(0,0,0,0.03)]" : "w-auto"
      }`}
    >
      <img src="" alt="" />
      <div className={`my-6 ${size === "md" ? "p-8" : ""}`}>
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
    </div>
  );
};

export default BlogCard;
