import Image from "next/image";
import { useMemo } from "react";
import { formatDuration, useAxios } from "../../utils";
import styles from "./CardCar.module.scss";
import ladingImage from "../../svg/spinner_loader.svg";

export function CardPrice({ src, period, timeAmount }) {
  const periodSelected = period || "month";
  const { data, loading } = useAxios({
    url: src,
    makeCall: typeof src === "string",
  });
  const carSelected = useMemo(() => {
    if (!isNaN(timeAmount)) {
      return data?.filter((d) => {
        return (
          d.periodType?.toLowerCase() === periodSelected?.toLowerCase() &&
          d.periodsAmount === timeAmount
        );
      })[0];
    }
    return data?.filter(
      (d) => d.periodType?.toLowerCase() === periodSelected?.toLowerCase()
    )[0];
  }, [timeAmount, data, periodSelected]);
  const price = useMemo(
    () => new Intl.NumberFormat("de-DE").format(carSelected?.periodPrice || 0),
    [carSelected]
  );

  if (loading || !data) {
    return;
  }

  return (
    <section className={styles.price}>
      <article>
        <span>desde</span>
        <div>
          <h5>$</h5>
          <h1 className="fs-2">{price}</h1>
          <h6>/ {formatDuration(carSelected?.periodType)}</h6>
        </div>
      </article>
    </section>
  );
}
