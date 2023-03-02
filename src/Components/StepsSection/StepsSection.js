import React from "react";
import { classNames } from "../../utils";
import styles from "./StepsSection.module.scss";
import { Button } from "../Button";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { steps } from "./utils";
import { useRouter } from "next/router";

export function StepsSection({
  className,
  isSimplified = true,
  title,
  data = steps,
}) {
  const router = useRouter();
  return (
    <Container
      className={classNames(
        className,
        styles.stepSection,
        !isSimplified && styles.stepSectionExtended,
        "text-center",
      )}
    >
      {title ? title : <h2>Disfruta la nueva experiencia de connet car</h2>}
      <section className={styles.grid}>
        {data?.map((step) => (
          <div key={step.id} className={classNames("text-center", styles.card)}>
            {step.img && <Image src={step.img} alt="copec voltex logo" />}
            {step.title && <h4>{step.title}</h4>}
            {step.subtitle && <h6 className="text-primary">{step.subtitle}</h6>}
            {step.desc && <p>{step.desc}</p>}
          </div>
        ))}
      </section>
      {isSimplified && (
        <Row
          className={classNames(
            styles.buttons,
            "justify-content-center align-items-center",
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
      )}
    </Container>
  );
}
