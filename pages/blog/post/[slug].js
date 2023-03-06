import Head from "next/head";
import api from "../../../src/api";
import { PostContent } from "../../../src/Components/PostContent/PostContent";
import { serialize } from "next-mdx-remote/serialize";
export const config = {
  runtime: "nodejs",
};
const Post = ({ title, content, randomPosts = [] }) => {
  return (
    <>
      <Head>
        <title>{title} 🚘</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostContent title={title} content={content} randomPosts={randomPosts} />
    </>
  );
};

Post.getInitialProps = async ({ query: { slug } }) => {
  const response = await api.get("blogPosts", { postId: slug });
  const props = response?.data?.data?.[0] || {};
  const resPosts = await api.get("blogPosts", { limit: 3, sort: "random" });
  const randomPosts = resPosts?.data?.data;
  const mdxSource = await serialize(props?.content, {
    mdxOptions: {
      development: false,
    },
  });
  return { ...props, content: mdxSource, randomPosts };
};

export default Post;
