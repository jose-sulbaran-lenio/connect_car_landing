import React, { useMemo } from "react";
import ButtonBp from "react-bootstrap/Button";
import { classNames } from "../../utils";
import styles from "./Button.module.scss";

export function Button(props) {
  const { variant, small, smaller, big, className, ...rest } = props;
  const isNormal = useMemo(() => {
    return !variant || variant.includes("outline");
  }, [variant]);
  return (
    <ButtonBp
      className={classNames(
        className,
        styles.button,
        styles[variant],
        isNormal && styles.outline,
        big && styles.big,
        small && styles.small,
        smaller && styles.smaller,
        "rounded-pill",
      )}
      variant={variant || "outline-primary"}
      {...rest}
    />
  );
}
