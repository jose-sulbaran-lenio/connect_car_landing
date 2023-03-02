import React from "react";
import { classNames, formatPeriodKeyToApi, notFoundFilters } from "../../utils";
import { CardCar } from "../CardCar";
import styles from "./FindCar.module.scss";
import { Button } from "../Button";
import { LoadingCards } from "./LoadingCards";
import { EmptyState } from "./EmptyState";

export function CarsGrid(props) {
  const {
    loading,
    pricePreLoaded,
    data,
    currentFilters,
    clearFilters,
    isDefaultFilters,
  } = props;
  const [timeAmount, period] = currentFilters.periods.split("_");
  if (loading && !data?.length) {
    return <LoadingCards />;
  }

  if (!data?.length && !isDefaultFilters) {
    return (
      <EmptyState
        currentFilters={currentFilters}
        clearFilters={clearFilters}
        show={!data?.length && !isDefaultFilters}
      />
    );
  }

  return (
    <div className={classNames("", styles.cards)}>
      {data?.map((car, index) => {
        return (
          <div key={car?.vehicleId || index}>
            <CardCar
              {...car}
              pricePreLoaded={pricePreLoaded}
              period={formatPeriodKeyToApi(period)}
              filters={currentFilters}
              timeAmount={timeAmount * 1 === 0 ? undefined : timeAmount * 1}
              autoHeight={false}
              bgVariant={index % 2 === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
