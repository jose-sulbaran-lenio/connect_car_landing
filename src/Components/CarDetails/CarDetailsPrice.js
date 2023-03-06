import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./CarDetails.module.scss";
import Dropdown from "react-bootstrap/Dropdown";
import ContentLoader from "react-content-loader";
import { Button } from "../Button";
import {
  classNames,
  formatDuration,
  formatOrderBy,
  formatPeriod,
  sortPeriods,
  useAxios,
} from "../../utils";

export function CarDetailsPrice({ price }) {
  const { data, loading } = useAxios({ url: price, makeCall: true });
  const [period, setPeriod] = useState({
    type: "",
    amount: 0,
    price: 0,
  });

  useEffect(() => {
    setPeriod({
      type: (data || [])[0]?.periodType,
      amount: (data || [])[0]?.periodsAmount,
      price: (data || [])[0]?.periodPrice,
    });
  }, [data]);

  if (loading || !period.price) {
    return (
      <div className={styles.loadingState}>
        <ContentLoader width={600} height={450} viewBox="0 0 600 450">
          <rect x="0" y="10" rx="3" ry="3" width="250" height="30" />
          <rect x="0" y="60" rx="3" ry="3" width="400" height="30" />
          <rect x="0" y="100" rx="3" ry="3" width="400" height="30" />
          <rect x="0" y="140" rx="3" ry="3" width="600" height="30" />

          <rect x="0" y="190" rx="3" ry="3" width="200" height="50" />
          <rect x="400" y="190" rx="3" ry="3" width="200" height="50" />

          <rect x="0" y="250" rx="3" ry="3" width="200" height="50" />
          <rect x="400" y="250" rx="3" ry="3" width="200" height="50" />

          <rect x="0" y="320" rx="3" ry="3" width="600" height="30" />

          <rect x="0" y="360" rx="3" ry="3" width="600" height="30" />

          <rect x="0" y="400" rx="3" ry="3" width="600" height="40" />
        </ContentLoader>
      </div>
    );
  }

  return (
    <>
      <h1 className={styles.miPlanConnectCar}>Mi plan connect car</h1>
      <h2 className={styles.eligeLaOpcion}>
        Elige la opción más conveniente para ti
      </h2>
      <p className={styles.textDescription}>Periodo de suscripción</p>
      <Dropdown
        className={classNames("d-flex flex-column pb-4", styles.dropdownMenu)}
        drop="down-centered"
      >
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
          {formatPeriod(period?.type, period?.amount)}
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropdownMenu}>
          {sortPeriods(data || []).map(
            ({ id, periodType, periodsAmount, periodPrice }) => (
              <Dropdown.Item
                key={id}
                onClick={() => {
                  setPeriod({
                    type: periodType,
                    amount: periodsAmount,
                    price: periodPrice,
                  });
                }}
              >
                {formatPeriod(periodType, periodsAmount)}
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        <Col className="col-8 col-md-6 d-flex">
          <p className={styles.textDescription}>Kilometraje anual incluido</p>
        </Col>
        <Col className="col-4 col-md-6 d-flex justify-content-end">
          <p className={styles.textDescriptionValue}>18.000 kms.</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-6 col-md-6 d-flex">
          <p className={styles.textDescription}>Seguro total incluido</p>
        </Col>
        <Col className="col-6 col-md-6 d-flex justify-content-end">
          <p className={styles.textDescriptionValue}>10 UF deducible</p>
        </Col>
      </Row>
      <Row>
        <p className={styles.cuotaText}>Cuota</p>
        <span className={styles.priceText}>
          <b>${new Intl.NumberFormat("de-DE").format(Number(period.price))}</b>{" "}
          <span className={styles.mensualText}>
            / {formatDuration(period.type)}
          </span>
        </span>

        <p className={styles.elPrecioDelContrato}>
          * El precio del contrato está en UF
        </p>
        <div>
          <Button
            big
            variant="secondary"
            className={classNames(styles.btn, "justify-content-center")}
          >
            Quiero este connect car
          </Button>
        </div>
      </Row>
    </>
  );
}
