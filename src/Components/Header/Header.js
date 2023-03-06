import React from "react";
import { classNames } from "../../utils";
import styles from "./Header.module.scss";
import { Button } from "../Button";
import { useRouter } from "next/router";

export function Header(props) {
  const { className, ...rest } = props;
  const router = useRouter();

  return (
    <div className={classNames(className, styles.header)} {...rest}>
      <section>
        <div className={styles.bgOne}></div>
        <div className={styles.bgTwo}>
          <section>
            <h3 className={styles.title}>Suscríbete a lo bueno de manejar</h3>
            <span className={styles.subTitle}>
              <strong>Suscríbete a tu auto por 3, 6, 12, 18 o 24 meses </strong>
              y disfruta de solo manejar, del resto nos preocupamos nosotros
            </span>
            <Button
              big
              variant="secondary"
              className={styles.button}
              onClick={() => {
                router.push("/find-car");
              }}
            >
              Suscríbete a tu auto favorito
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}
