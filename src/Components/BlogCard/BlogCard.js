import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Image from "next/image";
import Placeholder from "../../images/placeholder.png";
import styles from "./BlogCard.module.scss";
import { useRouter } from "next/router";

export function BlogCard({ title, imageUrl, content, postId }) {
  const [fallbackImage, setFallbackImage] = useState(imageUrl);
  const router = useRouter();
  return (
    <div
      className={styles.postContainer}
      onClick={() => router.push(`/blog/post/${postId}`)}
    >
      <Row className="mx-0">
        <Image
          src={fallbackImage}
          width={1000}
          height={1000}
          alt="full copec logo"
          className={styles.image}
          onError={() => {
            setFallbackImage(Placeholder);
          }}
        />
      </Row>
      <Row className="px-2 mx-0">
        <h1 className={styles.title}>{title}</h1>
      </Row>
      <Row className="px-2 mx-0">
        <p className={styles.description}>
          {content.replace(/(<([^>]+)>)|[^a-zA-Z0-9,:;\-.?!áéíóúüñ\s]/gi, "")}
        </p>
      </Row>
    </div>
  );
}
