import React from "react";
import { classNames } from "../../utils";
import styles from "./Breadcrumb.module.scss";
import { Breadcrumb as BreadcrumbBootstrap, Row } from "react-bootstrap";
import Link from "next/link";

const pathDictionary = {
  "Encuentra tu auto favorito": "/find-car",
  Blog: "/blog",
};

export function Breadcrumb({ paths = [], noPadding = false }) {
  return (
    <Row className={classNames(!noPadding && "py-5", "hide-mobile")}>
      <BreadcrumbBootstrap
        className={classNames(styles.breadcrumb)}
        style={{ "--bs-breadcrumb-divider": "'>'" }}
      >
        <BreadcrumbBootstrap.Item linkAs={Link} href="/">
          Inicio
        </BreadcrumbBootstrap.Item>
        {paths.length > 0 &&
          paths.map((path, i) => (
            <BreadcrumbBootstrap.Item
              active={i === paths.length - 1}
              linkAs={Link}
              href={pathDictionary[path] ?? path}
              key={path}
            >
              {path}
            </BreadcrumbBootstrap.Item>
          ))}
      </BreadcrumbBootstrap>
    </Row>
  );
}
