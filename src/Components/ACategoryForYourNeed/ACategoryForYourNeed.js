import React from "react";
import { classNames } from "../../utils";
import styles from "./ACategoryForYourNeed.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { CardCar } from "../CardCar";
import { Button } from "../Button";
import hatchback from "../../images/cars/hatchback.png";
import sedan from "../../images/cars/sedan.png";
import suv from "../../images/cars/suv.png";
import pick_up from "../../images/cars/pick_up.png";
import car1 from "../../images/cars/car1.png";
import { useRouter } from "next/router";

export function ACategoryForYourNeed() {
  const router = useRouter();
  return (
    <Container className={styles.section}>
      <Row className={classNames(styles.miniCardsSection, "pb-5")}>
        <h2 className={classNames("text-center", "pb-5", "text-dark")}>
          Una categoría para tu necesidad
        </h2>
        {/* <Row className={classNames("text-center", "pb-5")}>
        </Row> */}
        <section className={classNames(styles.cardsGrid)}>
          <CardCar
            carImageSrc={hatchback}
            className={styles.card1}
            bgVariant
            title="Hatchback"
            hidenButton
            onClick="/find-car?category=hatchback"
          />
          <CardCar
            carImageSrc={sedan}
            className={styles.card2}
            title="Sedán"
            hidenButton
            onClick="/find-car?category=sedan"
          />
          <CardCar
            carImageSrc={suv}
            className={styles.card3}
            bgVariant
            title="SUV"
            hidenButton
            onClick="/find-car?category=suv"
          />
          <CardCar
            carImageSrc={pick_up}
            className={styles.card4}
            title="Pick up"
            hidenButton
            onClick="/find-car?category=pick-up"
          />
          <CardCar
            carImageSrc={car1}
            className={styles.card5}
            bgVariant
            title="Eléctricos"
            hidenButton
            onClick="/find-car?fuel=electric"
          />
        </section>
      </Row>
      <Row
        className={classNames(
          "justify-content-center align-items-center",
          styles.btnSection
        )}
      >
        <Col>
          <Button
            big
            variant="tertiary"
            className="mx-auto"
            onClick={() => {
              router.push("/find-car");
            }}
          >
            Encuentra tu auto favorito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
