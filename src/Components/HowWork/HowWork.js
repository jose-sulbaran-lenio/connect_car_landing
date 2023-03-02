import React from "react";
import styles from "./HowWork.module.scss";
import { Breadcrumb } from "../Breadcrumb";
import { Container, Carousel } from "react-bootstrap";
import { classNames, useMediaQuery } from "../../utils";
import { StepsSection } from "../StepsSection";
import { FeaturedSection } from "../FeaturedSection";
import Accordion from "react-bootstrap/Accordion";
import { steps } from "./utils";
import { CardCar } from "../CardCar";
import { FAQStaticText } from "../utils/static-texts";

export function HowWork(props) {
  const { className, cars } = props;
  const isMobile = useMediaQuery("(max-width: 1025px)");

  return (
    <Container className={classNames(className, styles.container)}>
      <Breadcrumb paths={["¿Cómo funciona?"]} noPadding />

      <h2>La nueva forma inteligente de moverse</h2>
      <h5>Disfruta sólo de manejar, del resto nos preocupamos nosotros</h5>

      <StepsSection
        isSimplified={false}
        data={steps}
        title={
          <h3 className="text-primary text-center">
            Disfruta de la nueva experiencia de connect car en solo 4 pasos
          </h3>
        }
      />

      <FeaturedSection
        isSimplified
        subtitle={
          <h6 className="text-center text-primary">
            connect car te permite tener un auto de forma flexible y que solo te
            preocupes de manejar.
          </h6>
        }
      />
      <section>
        <h2 className="text-center">¿Aún tienes dudas?</h2>
        <h6 className="text-center text-primary">Te las aclaramos.</h6>

        <Accordion>
          {Object.entries(FAQStaticText).map(([title, description]) => (
            <Accordion.Item key={title} eventKey={title}>
              <Accordion.Header>{title}</Accordion.Header>
              <Accordion.Body className={styles.answerFAQ}>
                {description}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
      <section className={styles.carsSection}>
        <h2>¿No estás seguro de tu modelo preferido?</h2>
        <h6 className="text-primary">
          Acá tenemos algunos modelos que te pueden interesar
        </h6>
        {!isMobile ? (
          <div className={classNames("", styles.cards)}>
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
          </div>
        ) : (
          <Carousel touch interval={null} className={styles.carousel}>
            {cars?.map((car, index) => (
              <Carousel.Item key={car?.id}>
                <CardCar {...car} bgVariant={index % 2 === 0} />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </section>
    </Container>
  );
}
