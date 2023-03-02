import React from "react";
import styles from "./BlogPages.module.scss";
import { BlogCard } from "../BlogCard";
import { Container } from "react-bootstrap";
import { Breadcrumb } from "../Breadcrumb";

export function BlogPages({ posts = [] }) {
  return (
    <Container className={styles.container}>
      <Breadcrumb paths={["Blog"]} noPadding />
      <title className={styles.title}>El blog connect car</title>
      <h2 className={styles.subtitle}>
        Todas nuestras publicaciones en un solo lugar
      </h2>
      <div className={styles.postsContainer}>
        {posts.length > 0 &&
          posts.map(({ id, ...props }) => <BlogCard key={id} {...props} />)}
      </div>
    </Container>
  );
}
