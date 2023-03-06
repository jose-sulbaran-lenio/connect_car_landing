import React, { useMemo } from "react";
import Image from "next/image";
import styles from "./CardCar.module.scss";
import Plug from "../../svg/plug.svg";
import { Button } from "../Button";
import { classNames, formatDuration } from "../../utils";
import { CarImg } from "./CarImg";
import { CardPrice } from "./CardPrice";
import { useRouter } from "next/router";

export function CardCar({
  eco = false,
  carImageSrc,
  bgVariant,
  onClick,
  className,
  specs,
  title,
  subTitle,
  variant = "default",
  autoHeight = true,
  hidenButton = false,
  price,
  priceData,
  pricePreLoaded,
  raw,
}) {
  const router = useRouter();
  const clicking = useMemo(() => {
    return typeof onClick === "string"
      ? () =>
          !router.asPath.includes(onClick) &&
          router.push(`${onClick}`.replaceAll(" ", "_"))
      : onClick;
  }, [onClick, router]);

  return (
    <div
      className={classNames(
        variant === "default" ? styles.card : styles.cardVariant,
        variant === "carDetails" && styles.carDetails,
        bgVariant && styles.bgVariant,
        className,
        !autoHeight && styles.fixedHeight,
        title && !price && styles.customSizeCard,
        !specs && styles.noSpecs,
        hidenButton && styles.clickCar,
      )}
      onClick={clicking}
    >
      <div className={classNames(onClick && "pb-4")}>
        {!!title && (
          <section className={styles.header}>
            {title && (
              <div
                className={classNames(
                  styles.title,
                  !specs && styles.mediumTitle,
                )}
              >
                <h3>{title}</h3>
                <span>{subTitle}</span>
              </div>
            )}
            {(eco || raw?.fuel === "ELECTRIC") && (
              <div className={styles.eco}>
                <Image src={Plug} alt="plug icon" />
              </div>
            )}
          </section>
        )}
        <section
          className={
            variant === "default" ? styles.picture : styles.pictureVariant
          }
        >
          <CarImg src={carImageSrc} alt={title} variant={variant} />
        </section>
        {!pricePreLoaded ? (
          variant !== "carDetails" && !!price && <CardPrice src={price} />
        ) : (
          <section className={styles.price}>
            <article>
              <span>desde</span>
              <div>
                <h5>$</h5>
                <h1 className="fs-2">
                  {new Intl.NumberFormat("de-DE").format(
                    priceData?.amount || 0,
                  )}
                </h1>
                <h6>/ {formatDuration(priceData?.type)}</h6>
              </div>
            </article>
          </section>
        )}

        {!!specs && (
          <section className={styles.specs}>
            {specs?.map(({ title, value }, index) => (
              <React.Fragment key={title}>
                <div>
                  <div className={styles.specsValue}>{value}</div>
                  <div className={styles.specsTitle}>{title}</div>
                </div>
                {index !== 2 && specs?.length - 1 !== index && (
                  <div className={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </section>
        )}
        {onClick && !hidenButton && (
          <Button
            onClick={clicking}
            variant={bgVariant ? "tertiary" : "secondary"}
            className="mx-auto mb-2"
          >
            Ver detalle vehículo
          </Button>
        )}
      </div>
    </div>
  );
}
