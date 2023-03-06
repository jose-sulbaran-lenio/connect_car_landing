import ContentLoader from "react-content-loader";
import { classNames } from "../../utils";
import styles from "./FindCar.module.scss";

export function LoadingCards() {
  return (
    <div className={classNames("", styles.cards)}>
      {Array.from(Array(9).keys()).map((index) => (
        <ContentLoader key={index} viewBox="0 0 30 40">
          <rect x="0" y="0" rx="2" ry="2" width="30" height="40" />
        </ContentLoader>
      ))}
    </div>
  );
}
