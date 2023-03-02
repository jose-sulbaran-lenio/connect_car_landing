import React from "react";
import { classNames } from "../../utils";
import styles from "./OurBlogSection.module.scss";
import { Button } from "../Button";
import { Col, Container, Row } from "react-bootstrap";
import ArrowRight from "../../svg/arrow-right.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export function OurBlogSection({
  postInfo: { title, description, slug, imageUrl },
}) {
  const router = useRouter();
  return (
    <div className={styles.parentContainerOurBlog}>
      <Container fluid className={classNames(styles.container)}>
        <Row>
          <Col className="p-0 col-12 col-lg-6">
            <section className={classNames(styles.leftSection)}>
              <p className="hide-mobile">Nuestro blog</p>
              <p>
                <b>Mejor que comprar o arrendar un auto</b>
              </p>
              <Button
                big
                variant="secondary"
                className={styles.buttonNuestrasPubl}
                onClick={() => {
                  router.push("/blog");
                }}
              >
                Mira nuestras publicaciones
              </Button>
            </section>
          </Col>
          <Col className="p-0 col-12 col-lg-6">
            <section className={styles.rightSection}>
              <Row className={styles.imageContainer}>
                <Image
                  src={imageUrl}
                  alt="full copec logo"
                  className={styles.image}
                  width={100}
                  height={100}
                />
              </Row>
              <Row className={styles.textContainer}>
                <p className={styles.textBeneficios}>{title}</p>
                <p className={styles.textDescription}>{description}</p>
                <Link
                  className={styles.linkSeguirLeyendo}
                  href={`/blog/post/${slug}`}
                >
                  Seguir leyendo{" "}
                  <Image
                    src={ArrowRight}
                    alt="plug icon"
                    className={styles.arrowRight}
                  />
                </Link>
              </Row>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
