import React from "react";
import { classNames } from "../../utils";
import { Container } from "react-bootstrap";
import styles from "./FindCar.module.scss";
import { Breadcrumb } from "../Breadcrumb";
import { Filters } from "./Filters";
import { CarsGrid } from "./CarsGrid";

export function FindCar(props) {
  const {
    loading,
    pricePreLoaded,
    data,
    filters,
    clearFilters,
    isDefaultFilters,
    changeFilter,
    currentFilters,
    className,
  } = props;

  return (
    <Container className={classNames(className, styles.container)}>
      <Breadcrumb paths={["Encuentra tu auto favorito"]} noPadding />
      <h2>Elige el auto que conecte contigo.</h2>
      <h6>
        Calcula el precio de cada vehículo dependiendo del período de
        suscripción
      </h6>
      <Filters
        clearFilters={clearFilters}
        isDefaultFilters={isDefaultFilters}
        currentFilters={currentFilters}
        changeFilter={changeFilter}
        data={filters}
      />
      <div className={classNames(styles.carsView)}>
        <CarsGrid
          clearFilters={clearFilters}
          loading={loading}
          pricePreLoaded={pricePreLoaded}
          isDefaultFilters={isDefaultFilters}
          data={data}
          currentFilters={currentFilters}
        />
      </div>
    </Container>
  );
}
