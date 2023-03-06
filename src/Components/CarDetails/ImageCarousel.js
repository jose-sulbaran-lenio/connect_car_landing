import { Carousel, Image } from "react-bootstrap";
import styles from "./CarDetails.module.scss";
import placeHolder from "../../images/placeholder.png";
import { classNames, useAxios } from "../../utils";
import { useMemo } from "react";
export function ImageCarousel({ src }) {
  const { data } = useAxios({ url: src, makeCall: true });
  const images = useMemo(
    () =>
      !!data ? data.filter((img) => img.documentId === "IMAGE_DASHBOARD") : [],
    [data]
  );

  return (
    <Carousel
      touch
      interval={null}
      className={classNames(
        styles.carousel,
        images.length <= 1 && "noIndicator"
      )}
    >
      {images.map(({ documentId, url }) => (
        <Carousel.Item key={documentId}>
          <Image
            src={url}
            className="w-100"
            alt="full copec logo"
            onError={(e) => {
              e.target.src = placeHolder.src;
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
