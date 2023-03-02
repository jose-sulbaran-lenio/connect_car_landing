import React from "react";
import { classNames } from "../../utils";
import styles from "./BenefitsSection.module.scss";
import { Button } from "../Button";
import { Col, Container, Row } from "react-bootstrap";
import FullCopec from "../../images/full-copec.png";
import Lavamax from "../../images/lavamax.png";
import CopecVoltex from "../../svg/copec-voltex.svg";
import Image from "next/image";

export function BenefitsSection(props) {
  const { className, ...rest } = props;

  return (
    <Container
      fluid
      className={classNames(className, styles.benefits)}
      {...rest}
    >
      <Row className="row-cols-1 row-cols-lg-2">
        <Col className={classNames(styles.bgOne)}>
          <section>
            <h1>
              Beneficios exclusivos
              <br />
              para nuestros clientes
            </h1>
            <Button big variant="secondary">
              Suscríbete a tu auto favorito
            </Button>
          </section>
        </Col>

        <Col className={classNames(styles.bgTwo, "py-5 py-lg-auto")}>
          <section>
            <Row className="row-cols-1 row-cols-lg-2">
              <Col className="text-center">
                <Image src={FullCopec} alt="full copec logo" />
              </Col>
              <Col>
                <div>
                  <strong>Acumula 3.000 Puntos</strong> Full Copec todos los
                  meses
                </div>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-lg-2">
              <Col className="text-center">
                <Image src={Lavamax} alt="Lavamax logo" />
              </Col>
              <Col>
                <div>
                  <strong>Lava tu auto gratis</strong> una vez al mes en
                  estaciones con Lavamax
                </div>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-lg-2">
              <Col className="text-center">
                <Image src={CopecVoltex} alt="copec voltex logo" />
              </Col>
              <Col>
                <div>
                  <strong>Prueba gratis</strong> un auto eléctrico por una
                  semana
                </div>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
