import React from "react";
import ContentLoader from "react-content-loader";

const Svg = (
  <>
    <rect x="0" y="300" rx="4" ry="4" width="200" height="19" />
    <rect x="0" y="350" rx="3" ry="3" width="380" height="9" />
    <rect x="0" y="370" rx="3" ry="3" width="380" height="9" />
    <rect x="0" y="390" rx="3" ry="3" width="380" height="9" />
    <rect x="0" y="0" rx="20" ry="20" width="375" height="270" />
  </>
);

const contentLoaderProps = {
  width: 375,
  height: 413,
  viewBox: "0 0 450 400",
  backgroundColor: "#f0f0f0",
  foregroundColor: "#dedede",
};
const numbersOfPosts = 9;
const numbersOfloaders = Array.from(Array(numbersOfPosts).keys());

const BlogCardLoader = () => (
  <>
    {numbersOfloaders.map((_, index) => (
      <ContentLoader key={`${index}-BlogCardLoader`} {...contentLoaderProps}>
        {Svg}
      </ContentLoader>
    ))}
  </>
);

export default BlogCardLoader;
