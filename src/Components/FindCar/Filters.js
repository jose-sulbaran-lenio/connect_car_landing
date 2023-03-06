import React, { useCallback } from "react";
import {
  classNames as defaultEmpty,
  formatFilterTitle,
  formatOrderBy,
  formatPeriodKey,
} from "../../utils";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "./FindCar.module.scss";
import { formatFuel } from "../../utils";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Button } from "../Button";
import { ORDER_BY } from "../../utils";
import { orderBy } from "./utils";

export function Filters({
  data,
  clearFilters,
  isDefaultFilters,
  currentFilters,
  changeFilter,
}) {
  const prepareDesktopFilter = useCallback(
    (filter, data) => {
      const filterValue =
        filter === "vehicleFuelTypes"
          ? formatFuel(currentFilters[filter])
          : filter === "periods"
          ? formatPeriodKey(currentFilters[filter])
          : filter === "orderBy"
          ? formatOrderBy(currentFilters[filter])
          : currentFilters[filter];

      const sotData =
        !!data && filter !== "periods" && filter !== "orderBy"
          ? data.sort()
          : data;
      return (
        !!sotData && (
          <Col
            key={filter}
            className={defaultEmpty(
              filter === "orderBy" && "justify-content-end d-flex",
            )}
          >
            <DropdownButton
              variant="outline-primary"
              id="dropdown-basic-button-3"
              title={`${formatFilterTitle(filter)}${defaultEmpty(
                filterValue && ":",
              )} ${
                filterValue === "all" ? "Todas" : defaultEmpty(filterValue)
              }`}
            >
              {filter !== "periods" && filter !== "orderBy" && (
                <Dropdown.Item onClick={changeFilter(filter, "all")}>
                  Todas
                </Dropdown.Item>
              )}
              {sotData?.map((value) => (
                <Dropdown.Item
                  key={value}
                  onClick={changeFilter(filter, value)}
                >
                  {filter === "vehicleFuelTypes"
                    ? formatFuel(value)
                    : filter === "periods"
                    ? formatPeriodKey(value)
                    : filter === "orderBy"
                    ? formatOrderBy(value)
                    : value}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        )
      );
    },
    [changeFilter, currentFilters],
  );
  const prepareMobileFilter = useCallback(
    (filter, data) => {
      return (
        !!data && (
          <div className="py-1" key={filter}>
            <Form.Select
              value={currentFilters[filter]}
              onChange={changeFilter(filter)}
            >
              <option
                value={
                  filter !== "periods" && filter !== "orderBy" ? "all" : ""
                }
              >
                {formatFilterTitle(filter)}
                {filter !== "periods" && filter !== "orderBy" && ": Todas"}
              </option>

              {data?.map((value) => {
                let filterValue = value;
                if (orderBy[value]) {
                  filterValue = orderBy[value];
                }
                if (filter === "vehicleFuelTypes") {
                  filterValue = formatFuel(value);
                }
                if (filter === "periods") {
                  filterValue = formatPeriodKey(value);
                }

                return (
                  <option key={value} value={value}>
                    {formatFilterTitle(filter)}: {filterValue}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        )
      );
    },
    [changeFilter, currentFilters],
  );
  return (
    <>
      <Row className={defaultEmpty("justify-content-between", styles.filters)}>
        <Col className="col-auto">
          <Row>
            {prepareDesktopFilter("periods", data?.periods)}
            {prepareDesktopFilter("vehicleCategories", data?.vehicleCategories)}
            {prepareDesktopFilter("vehicleBrands", data?.vehicleBrands)}
            {prepareDesktopFilter("vehicleFuelTypes", data?.vehicleFuelTypes)}

            {!isDefaultFilters && (
              <Col>
                <Button variant="primary" onClick={clearFilters} smaller>
                  Limpiar
                </Button>
              </Col>
            )}
          </Row>
        </Col>
        {prepareDesktopFilter("orderBy", ORDER_BY)}
      </Row>

      <Container className={styles.mobileFilters}>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filtros</Accordion.Header>
            <Accordion.Body>
              {prepareMobileFilter("periods", data?.periods)}
              {prepareMobileFilter(
                "vehicleCategories",
                data?.vehicleCategories,
              )}
              {prepareMobileFilter("vehicleBrands", data?.vehicleBrands)}
              {prepareMobileFilter("vehicleFuelTypes", data?.vehicleFuelTypes)}
              {prepareMobileFilter("orderBy", ORDER_BY)}

              {!isDefaultFilters && (
                <div
                  fluid
                  className="d-flex flex-column align-items-stretch py-3"
                >
                  <Button
                    className="justify-content-center"
                    variant="primary"
                    onClick={clearFilters}
                    smaller
                  >
                    Limpiar
                  </Button>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}
