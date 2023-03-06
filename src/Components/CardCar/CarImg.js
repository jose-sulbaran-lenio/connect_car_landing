import ImageNext from "next/image";
import { Image } from "react-bootstrap";
import ladingImage from "../../svg/spinner_loader.svg";
import { useAxios } from "../../utils";
import styles from "./CardCar.module.scss";

export function CarImg({ src, ...props }) {
  const { data, loading } = useAxios({
    url: src,
    makeCall: typeof src === "string",
  });

  if (typeof src === "object") {
    return <ImageNext src={src} {...props} />;
  }
  if (loading || !data) {
    return (
      <ImageNext className={styles.loadingPicture} src={ladingImage} {...props} />
    );
  }

  return (
    <Image
      src={data[0]?.url}
      alt={props.alt || "logo connect car"}
      {...props}
    />
  );
}
