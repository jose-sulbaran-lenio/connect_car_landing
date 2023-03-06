import React, { useEffect } from "react";
import { classNames } from "../../utils";
import styles from "./PostContent.module.scss";
import { Container } from "react-bootstrap";
import { Breadcrumb } from "../Breadcrumb";
import { MDXRemote } from "next-mdx-remote";
import { BlogCard } from "../BlogCard";

export function PostContent({ title, content, randomPosts = [] }) {
  useEffect(() => {
    const allContent = window.document
      .getElementById("mdxContent")
      .querySelectorAll("img");
    let isEven = true;
    allContent.forEach((elem) => {
      elem.classList.add(`${isEven ? styles.left : styles.right}`);
      isEven = !isEven;
    });
  }, []);

  return (
    <Container className={styles.container}>
      <Breadcrumb paths={["Blog", title]} noPadding />
      <div className={classNames(styles.post)}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.postContent} id="mdxContent">
          <MDXRemote {...content} />
        </div>
      </div>
      <h1 className={styles.nuestrasPublicaciones}>
        Nuestras publicaciones recientes
      </h1>
      <h2 className={styles.acaTeDejamosOtras}>
        Acá te dejamos otras publicaciones que te podrían interesar.
      </h2>
      <div className={styles.recommendedPostsContainter}>
        {randomPosts.length > 0 &&
          randomPosts.map(({ id, title, imageUrl, content, postId }) => (
            <BlogCard
              key={id}
              title={title}
              imageUrl={imageUrl}
              content={content}
              postId={postId}
            />
          ))}
      </div>
    </Container>
  );
}
