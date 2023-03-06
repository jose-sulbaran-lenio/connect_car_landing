import { useEffect, useState } from "react";
import { useTimeout } from "../../utils";

export function Loading({ show, duration, fixed = false }) {
  const [display, setDisplay] = useState("block");

  useEffect(() => {
    if (show) {
      setDisplay("block");
    }
  }, [show]);

  useTimeout(
    () => {
      !fixed && setDisplay("none");
    },
    duration || 1000,
    show
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "rgba(255, 255, 255, 0)",
        display,
        "shape-rendering": "auto",
      }}
      width="150px"
      height="150px"
      viewBox="0 -15 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-1s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(36 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.8888888888888888s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(72 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.7777777777777778s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(108 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(144 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.5555555555555556s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.4444444444444444s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(216 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(252 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.2222222222222222s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(288 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="-0.1111111111111111s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(324 50 50)">
        <rect
          x="48"
          y="31"
          rx="2"
          ry="2.6"
          width="4"
          height="10"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.1111111111111112s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
    </svg>
  );
}
