import { useRef, useState } from "react";
import api from "../src/api";
import { BlogPages, useViewportDetector } from "../src/Components";
import { Loading } from "../src/Components/utils/loading";
import { classNames, useAxios, useEffectOnce } from "../src/utils";
import styles from "../src/Components/BlogPages/BlogPages.module.scss";
function Blog({ posts }) {
  const [postOut, setPostOut] = useState(posts || []);
  const [ref, inViewport, direction] = useViewportDetector();
  const [loadEnd, setLoadEnd] = useState(false);
  const loadingMore = useRef(false);
  const BlogApi = useAxios({
    url: "blogPosts?limit=9&order=createdAt&sort=desc",
    params: {
      skip: posts.length,
    },
  });

  useEffectOnce(() => {
    if (!inViewport || direction === "up" || loadingMore.current || loadEnd) {
      return undefined;
    }
    BlogApi.call({
      params: {
        skip: postOut.length,
      },
    });
  }, [inViewport, direction, loadEnd]);

  useEffectOnce(() => {
    if (BlogApi.data?.length === 0) {
      setLoadEnd(true);
      return;
    }

    if (BlogApi.loading || !BlogApi.data) {
      return undefined;
    }

    loadingMore.current = false;
    setPostOut((prev) => [...prev, ...(BlogApi.data || [])]);
  }, [BlogApi.data]);

  return (
    <>
      <BlogPages posts={postOut} />
      <div ref={ref} className={classNames(styles.scrollLoad)}>
        {!loadEnd && <Loading show={inViewport} />}
      </div>
    </>
  );
}

Blog.getInitialProps = async () => {
  const resPosts = await api.get("blogPosts", {
    limit: 9,
    skip: 0,
    order: "createdAt",
    sort: "desc",
  });
  const posts = resPosts?.data?.data;

  return { posts };
};

export default Blog;
