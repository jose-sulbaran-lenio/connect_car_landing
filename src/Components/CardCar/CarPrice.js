import { useEffect, useState } from "react";
import api from "../../api";
import { useAxios } from "../../utils";

export function CarPrice({ src, period }) {
  const periodSelected = period || "MONTH";
  const { data, loading } = useAxios({
    url: src,
    makeCall: typeof src === "string",
  });
  if (loading || !data) {
    return "";
  }

  const price = new Intl.NumberFormat("de-DE").format(
    data?.filter((d) => d.periodType === periodSelected)[0]?.periodPrice,
  );

  return price;
}
