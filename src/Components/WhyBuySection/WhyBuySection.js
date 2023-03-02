import React from "react";
import { classNames } from "../../utils";
import styles from "./WhyBuySection.module.scss";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import Image from "next/image";
import { CardCar } from "../CardCar";
import { ColHeaderTable } from "../ColHeaderTable";
import CCLogo from "../../svg/CCLogo.svg";
const headers = [
  "Beneficios",
  "Patente",
  "Permiso de circulación",
  "Seguro total",
  "Sin cuota inicial",
  "Servicio y mantenimiento preventivo",
  "Cambio de neumáticos",
  "Vehículo de reemplazo",
  "Gestión de multas",
  "Entrega en tu casa",
];

const rows = [
  ["Crédito", "Compra Inteligente", () => <Image src={CCLogo} alt="CC logo" />],
  [true, false, true],
  [true, false, true],
  [true, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
  [false, false, true],
];

export function WhyBuySection({ cars, isSimplified = false }) {
  return (
    <Container className={styles.section}>
      <Row className="g-4">
        <Col
          className={classNames("col-12 col-md-12 col-xl-5", styles.cardCol)}
        >
          <div>
            <div
              className={classNames(
                isSimplified ? styles.cardColTitleSimply : styles.cardColTitle
              )}
            >
              <h3 className="text-dark">¿Por qué comprar?</h3>
              <h5 className={classNames(isSimplified && styles.subTitleSimp)}>
                Suscríbete y aprovecha los <br /> beneficios
              </h5>
              {isSimplified && (
                <span className={styles.description}>
                  connect car es tu opción más conveniente a la hora de acceder
                  a un automovil.
                </span>
              )}
            </div>
            {!isSimplified && (
              <Carousel touch interval={null} className={styles.carousel}>
                {cars?.map((car, index) => (
                  <Carousel.Item key={car?.id}>
                    <CardCar {...car} bgVariant={index % 2 === 0} />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
        </Col>
        <Col
          className={classNames(
            "col-12 col-md-12 col-xl-7 px-0",
            styles.beneficiosTabla
          )}
        >
          <ColHeaderTable headers={headers} rows={rows} />
        </Col>
      </Row>
    </Container>
  );
}
