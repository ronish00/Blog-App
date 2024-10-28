import React from "react";
import FeaturedImage from "../assets/FeaturedImage.png";
import { Link } from "react-router-dom";

const BlogCard = ({ size, title, content, date, category, slug }) => {
  const extractPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const plainText = extractPlainText(content);

  const formattedDate = new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/blogs/${slug}`}
      className={`${
        size === "big"
          ? "w-full"
          : size === "md"
          ? "mb-12 w-full flex items-center border border-[#EBEBEB] shadow-[0px_2px_11pxPrgva(0,0,0,0.03)]"
          : "w-3/12"
      }`}
    >
      <img
        src={FeaturedImage}
        alt=""
        className={`${
          size === "big"
            ? "w-full h-4/6"
            : size === "md"
            ? "h-80 w-96"
            : "w-full h-64"
        } object-cover`}
      />
      <div className={`${size === "md" ? "p-12" : "my-6"}`}>
        {category && <p className="mb-4 text-xs text-gray-500">{category}</p>}
        <h2
          className={`font-bold w-full ${
            size === "big" ? "text-4xl" : size === "md" ? "text-2xl" : "text-xl"
          }`}
        >
          {title}
        </h2>
        <p
          className={`truncate max-w-xl text-[#493738] mt-6 ${
            size === "sm" ? "hidden" : "block"
          }`}
        >
          {plainText.slice(0, 200)}
        </p>
        <p className="text-[#493738] mt-6">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
