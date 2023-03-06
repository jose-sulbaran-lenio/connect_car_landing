import React from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import { Button } from "../Button";
import styles from "./StillHaveDoubts.module.scss";
import { classNames } from "../../utils";
import { FAQStaticText } from "../utils/static-texts";
import { useRouter } from "next/router";

export function StillHaveDoubts({ isCarDetails = false, hideButton = false }) {
  const router = useRouter();
  return (
    <Container>
      <Row
        className={classNames(
          styles.rowContainer,
          `${hideButton && styles.paddingContainer}`
        )}
      >
        <h3
          className={classNames(
            "text-dark",
            styles.textStyle,
            !isCarDetails && "text-center",
            isCarDetails ? styles.titleCarDetails : styles.title
          )}
        >
          {isCarDetails
            ? "¿Aún tienes dudas?"
            : "¿Aún tienes dudas? Te las aclaramos."}
        </h3>
        {isCarDetails && (
          <h3 className={styles.teLasAclaramos}>Te las aclaramos.</h3>
        )}
        <Accordion>
          {Object.keys(FAQStaticText).map((title) => {
            return (
              <Accordion.Item key={title} eventKey={title}>
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body>{FAQStaticText[title]}</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Row>
      {!hideButton && (
        <Row className="d-flex justify-content-center">
          <Button
            variant="tertiary"
            className={`${styles.buttonResuelve}`}
            onClick={() => {
              router.push("/fqa");
            }}
          >
            Resuelve todas tus dudas
          </Button>
        </Row>
      )}
    </Container>
  );
}
