import React from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import styles from "./FQA.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { classNames } from "../../utils";
import { Breadcrumb } from "../Breadcrumb";
import { FAQStaticText } from "../utils/static-texts";

export function FQA() {
  return (
    <Container className={styles.container}>
      <Breadcrumb paths={["Preguntas Frecuentes"]} noPadding />
      <h1 className={classNames("text-dark", styles.tienesDudas)}>
        ¿Tienes dudas?
      </h1>
      <h4 className={classNames("text-dark")}>
        Acá encontrarás la respuesta a todas tus dudas
      </h4>
      <h2 className="text-primary show-mobile">
        Nuestra Misión es co-crear el futuro de la movilidad y el acceso a los
        automoviles
      </h2>
      <Row>
        <Tabs
          defaultActiveKey="sub"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="sub" title="Suscripción">
            <div>
              <Accordion defaultActiveKey="¿Cómo funciona el proceso de contratación?">
                {Object.entries(FAQStaticText)?.map(
                  ([title, description], index) => (
                    <Accordion.Item key={title} eventKey={title}>
                      <Accordion.Header>{title}</Accordion.Header>
                      <Accordion.Body>{description}</Accordion.Body>
                    </Accordion.Item>
                  ),
                )}
              </Accordion>
            </div>
          </Tab>
          <Tab eventKey="car" title="Vehículos">
            <div />
          </Tab>
          <Tab eventKey="sec" title="Seguro">
            <div />
          </Tab>
          <Tab eventKey="pay" title="Pagos">
            <div />
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}
