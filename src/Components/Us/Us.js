import React from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import person from "../../images/person.png";
import { Breadcrumb } from "../Breadcrumb";
import styles from "./Us.module.scss";

const people = [
  { id: 0, name: "Nicolás Mayne-Nicholls" },
  { id: 1, name: "Benjamin Pérez" },
  { id: 2, name: "Christian Chamorro" },
  { id: 3, name: "Cristóbal Muñoz" },
  { id: 4, name: "José Tomás González" },
  { id: 5, name: "Juan Cristóbal Michelson" },
  { id: 6, name: "Matías Feuereisen" },
  { id: 7, name: "Sebastian López" },
  { id: 8, name: "Felipe Toro" },
  { id: 9, name: "Renata Melotti" },
];

export function Us() {
  return (
    <Container className={styles.container}>
      <Breadcrumb paths={["Nosotros"]} noPadding />

      <h1 className="text-dark">Somos connect car</h1>
      <h4 className="text-dark">
        Te invitamos a co-crear el futuro de la movilidad y el acceso al
        automovil
      </h4>
      <h3 className="text-primary text-center">
        Nuestra Misión es co-crear el futuro de la movilidad y el acceso a los
        automoviles
      </h3>
      <p className="text-dark">
        <strong>
          Nuestra misión y nuestra meta es impulsar y liderar el cambio de
          paradigma en torno al automóvil. Buscamos entregar un servicio y
          vehículos de primera calidad y de esta manera privilegiar el acceso al
          automóvil y a todos sus servicios.
        </strong>
        <br />
        <br />
        Para poder llevar esto a cabo es que nace durante el 2022 connect car,
        donde a partir de nuestra oferta de vehículos y servicios buscamos que
        las personas puedan tener acceso a más pero sin tener que invertir
        grandes sumas.
        <br />
        <br />
        Uno de nuestros principales valores es la excelencia en el servicio y la
        cercanía con nuestros clientes, donde más que ofrecer un servicio rígido
        y estructurado, buscamos co-crear con ustedes el futuro de la movilidad
        e ir adaptando nuestra oferta a sus necesidades y a sus inquietudes.
        <br />
        <br />
        Amamos los autos, la tecnología y la movilidad, por lo que te invitamos
        a sucribirte a connect car y a experimentar y crear juntos la movilidad
        del futuro.
      </p>
      <h3 className="text-dark text-center">Team connect car</h3>
      <section className={styles.grid}>
        {people?.map(({ id, name, img }) => (
          <div key={id}>
            <Image alt={name} src={img ? img : person} />
            <p className="text-dark">{name}</p>
          </div>
        ))}
      </section>
    </Container>
  );
}
