import React from "react";
import Image from "next/image";
import { classNames } from "../../utils";
import styles from "./FeaturedSection.module.scss";
import { Button } from "../Button";

import FrontCar from "../../svg/front-car.svg";
import Gasoline from "../../svg/gasoline.svg";
import Keys from "../../svg/keys.svg";
import Rubbers from "../../svg/rubbers.svg";
import Tachometer from "../../svg/tachometer.svg";
import Tools from "../../svg/tools.svg";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";

const featured = [
  {
    id: "1",
    area: "car",
    img: FrontCar,
    title: "Seguro Total",
    desc: "Prima de 10 UF",
  },
  {
    id: "2",
    area: "gas",
    img: Gasoline,
    title: "Asistencia en Ruta",
    desc: `Te ofrecemos ayuda en cualquier lugar y 
    circunstancia`,
  },
  {
    id: "3",
    area: "key",
    img: Keys,
    title: "Vehículo de Reemplazo",
    desc: `Si tu autmóvil tiene algún desperfecto, 
    te ofrecemos otros de similares 
    características`,
  },
  {
    id: "4",
    area: "rubber",
    img: Rubbers,
    title: "Cambio de Neúmaticos",
    desc: `Si existe algún desperfecto, te lo 
    cambiaremos inmediatamente`,
  },
  {
    id: "5",
    area: "tachometer",
    img: Tachometer,
    title: "Permiso de Circulación",
    desc: "100% pagado anualmente",
  },
  {
    id: "6",
    area: "tools",
    img: Tools,
    title: `Revisión Técnica y Mantenimiento`,
    desc: `Revisión anual y mantenimientos programados`,
  },
];

export function FeaturedSection({ className, isSimplified = false, subtitle }) {
  const router = useRouter();
  return (
    <Container
      className={classNames(
        "py-5",
        className,
        isSimplified ? styles.featuredSimplified : styles.featured
      )}
    >
      <h2
        className={classNames(
          "text-center",
          isSimplified && styles.todoIncluido
        )}
      >
        Todo incluido en una cuota mensual
      </h2>

      {subtitle || (
        <h6
          className={classNames(isSimplified && "show-mobile", "text-center")}
        >
          Disfruta la tranquilidad que te entrega tener todo incluido
        </h6>
      )}

      <div className={styles[`${isSimplified ? "gridFlex" : "grid"}`]}>
        {featured.map((feature) => {
          return (
            <section
              className={classNames(styles[feature.area], styles.gridItem)}
              key={feature.id}
            >
              <Image
                className={classNames(
                  isSimplified ? styles.imgSimplified : styles.img
                )}
                src={feature.img}
                alt="front carr"
              />
              <h5
                className={classNames(
                  styles.title,
                  "text-center",
                  isSimplified ? "fs-6" : "fs-5",
                  "fw-bolder",
                  "text-dark"
                )}
              >
                {feature.title}
              </h5>
              {!isSimplified && (
                <p
                  className={classNames(
                    styles.desc,
                    "text-center",
                    "text-muted"
                  )}
                >
                  {feature.desc}
                </p>
              )}
            </section>
          );
        })}
      </div>
      {!isSimplified && (
        <Row>
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
