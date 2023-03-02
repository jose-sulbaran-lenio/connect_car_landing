import React, { useState } from "react";
import { Accordion, Carousel, Col, Container, Row } from "react-bootstrap";
import { CardCar } from "../CardCar";
import styles from "./CarDetails.module.scss";
import {
  FeaturedSection,
  WhyBuySection,
  StillHaveDoubts,
  Breadcrumb,
} from "../../Components";
import { ImageCarousel } from "./ImageCarousel";
import { CarDetailsPrice } from "./CarDetailsPrice";
import { classNames, useMediaQuery } from "../../utils";

export function CarDetails({ cars, details }) {
  const [period, setPeriod] = useState("12 Meses");
  const isMobile = useMediaQuery("(max-width: 1025px)");
  return (
    <Container className={styles.container}>
      <Breadcrumb
        paths={[
          "Encuentra tu auto favorito",
          `${details.title} ${details.subTitle}`,
        ]}
        noPadding
      />
      <h1
        className={styles.titleCar}
      >{`${details.title} ${details.subTitle}`}</h1>
      <h2 className={styles.subtitleCar}>{details?.raw?.version}</h2>
      <Row className={styles.rowContainer}>
        <Col className="col-md-6 pe-lg-5">
          <CardCar
            specs={details?.specs}
            carImageSrc={details?.carImageSrc}
            variant="carDetails"
            bgVariant={false}
          />
        </Col>
        <Col
          className={classNames(
            "col-md-6 ps-lg-5 d-flex flex-column",
            styles.desc,
          )}
        >
          <CarDetailsPrice period={period} price={details.price} />
        </Col>
      </Row>

      <Row className={styles.rowContainer}>
        <Col className="col-12 mb-md-0 mb-5 col-md-6 pe-2 pe-lg-5 d-flex flex-column">
          <span className={styles.equipamiento}>Equipamiento</span>
          <ImageCarousel
            src={`/vehicle-file-download-url?vehicleId=${details.id}`}
          />
          <span className={styles.lasImagenesSonReferenciales}>
            * Las imágenes son referenciales y podrían variar.
          </span>
        </Col>
        <Col className="col-md-6 ps-2 ps-lg-5">
          <Accordion className={styles.accordionDetails} alwaysOpen>
            {details.interior && (
              <Accordion.Item eventKey="0">
                <Accordion.Header>Interior</Accordion.Header>
                <Accordion.Body>
                  <span className={styles.bodyAccordion}>
                    {details.interior}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {details.exterior && (
              <Accordion.Item eventKey="1">
                <Accordion.Header>Exterior</Accordion.Header>
                <Accordion.Body>
                  <span className={styles.bodyAccordion}>
                    {details.exterior}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {details.security && (
              <Accordion.Item eventKey="2">
                <Accordion.Header>Seguridad</Accordion.Header>
                <Accordion.Body>
                  <span className={styles.bodyAccordion}>
                    {details.security}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            )}
            {details.technical && (
              <Accordion.Item eventKey="3">
                <Accordion.Header>Datos técnicos</Accordion.Header>
                <Accordion.Body>
                  <span className={styles.bodyAccordion}>
                    {details.technical}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        </Col>
      </Row>
      <Row>
        <FeaturedSection isSimplified />
      </Row>
      <Row>
        <WhyBuySection isSimplified />
      </Row>
      <Row>
        <StillHaveDoubts isCarDetails hideButton />
      </Row>
      <div className={classNames(styles.cards)}>
        <h2 className={styles.noEstasSeguro}>
          ¿No estás seguro de este modelo?
        </h2>
        <h3 className={styles.acaTenemosOtros}>
          Acá tenemos otros modelos que te pueden interesar
        </h3>
        {!isMobile ? (
          <Row className="gap-5 d-flex justify-content-center pb-5">
            {cars?.map((car, index) => {
              return (
                <CardCar
                  key={car.id}
                  {...car}
                  className={styles[`card${index + 1}`]}
                  autoHeight={false}
                  bgVariant={index % 2 === 0}
                />
              );
            })}
          </Row>
        ) : (
          <Carousel touch interval={null} className={styles.lastCarousel}>
            {cars?.map((car, index) => (
              <Carousel.Item key={car?.id}>
                <CardCar {...car} bgVariant={index % 2 === 0} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </Container>
  );
}
