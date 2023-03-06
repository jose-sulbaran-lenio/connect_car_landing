import { useEffect, useState } from "react";
import { classNames, notFoundFilters, useTimeout } from "../../utils";
import { Button } from "../Button";
import { Loading } from "../utils/loading";
import styles from "./FindCar.module.scss";

export function EmptyState({ currentFilters, clearFilters, show, showIn }) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (show) {
      setDisplay(false);
    }
  }, [show]);

  useTimeout(
    () => {
      setDisplay(true);
    },
    showIn || 1000,
    show
  );

  if (!display) {
    return (
      <div className={classNames("my-5", styles.emptyState)}>
        <Loading show fixed />
      </div>
    );
  }

  return (
    <div className={classNames("my-5", styles.emptyState)}>
      <h4>{notFoundFilters(currentFilters)}</h4>
      <Button variant="primary" onClick={clearFilters} smaller>
        Limpiar los filtros
      </Button>
    </div>
  );
}
