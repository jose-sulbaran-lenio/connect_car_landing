import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  container,
  colEmpresa,
  footerLinks,
  footerLinksNoBold,
  colInfo,
  buttonSubscribe,
  rowSuscribete,
  form,
  connectLogo,
  childContainer,
  firstRow,
  copyright,
  formRow,
  nosotrosPTag,
} from "./Footer.module.scss";
import LogoCC from "../../svg/logo-cc-capital-letters.svg";
import IGLogo from "../../svg/instagram-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";

export function Footer() {
  const [isLessThanMd, setIsLessThanMd] = useState(false);
  useEffect(() => {
    setIsLessThanMd(window.matchMedia("(max-width: 768px)").matches);
  });

  return (
    <Container className={`${container}`}>
      <Container className={childContainer}>
        <Row className={firstRow}>
          <Col className={`${connectLogo} col-12 col-md-4`}>
            <Image src={LogoCC} alt="plus sign" />
            <Link
              href="https://www.instagram.com/connectcar.cl/"
              target="_blank"
            >
              <Image src={IGLogo} alt="plus sign" />
            </Link>
          </Col>
          <Col className={`${colEmpresa} col-12 col-md-2`}>
            {!isLessThanMd && (
              <Row>
                <span className={`${footerLinks} `}>Empresa</span>
              </Row>
            )}
            <Row>
              <Link
                className={`${footerLinksNoBold} ${nosotrosPTag}`}
                href="/us"
              >
                Nosotros
              </Link>
            </Row>
          </Col>
          <Col className={`${colInfo} col-12 col-md-3`}>
            <Row>
              <span className={`${footerLinks}`}>Info</span>
            </Row>
            <Row>
              <Link className={`${footerLinksNoBold}`} href="/find-car">
                Encuentra tu auto favorito
              </Link>
            </Row>
            <Row>
              <Link className={`${footerLinksNoBold}`} href="/how-work">
                ¿Como Funciona?
              </Link>
            </Row>
            <Row>
              <Link className={`${footerLinksNoBold}`} href="/fqa">
                Preguntas frecuentes
              </Link>
            </Row>
            <Row>
              <Link className={`${footerLinksNoBold}`} href="/blog">
                Blog
              </Link>
            </Row>
          </Col>
          <Col className={`col-12 col-md-3`}>
            <Row className={rowSuscribete}>
              <p>Suscríbete a nuestro Newsletter</p>
              <p>Conoce nuestras promociones exclusivas</p>
            </Row>
            <Row>
              <Form className={form}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control type="email" placeholder="Ingresa tu email" />
                </Form.Group>
              </Form>
            </Row>
            <Row className={`${formRow} d-flex`}>
              <Button variant="secondary" className={buttonSubscribe}>
                Suscribirme
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <p className={copyright}>
            © 2022 connectcar. Todos los derechos reservados.
          </p>
        </Row>
      </Container>
    </Container>
  );
}
