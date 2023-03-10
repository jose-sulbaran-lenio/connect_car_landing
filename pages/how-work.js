import Head from "next/head";
import { HowWork as HowWorkComponent } from "../src/Components/HowWork";
import { formatCardsCar } from "../src/utils";
import api from "../src/api";
import { useEffect } from "react";

function HowWork({ data }) {
  return (
    <>
      <Head>
        <title>¿Cómo funciona? 🚘</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HowWorkComponent cars={data} />
    </>
  );
}

HowWork.getInitialProps = async () => {
  try {
    const res = await api.get(
      "organization-vehicles?sort=random&populate=true&limit=3"
    );
    const posts = res?.data?.data;
    return {
      data: posts?.map(formatCardsCar),
    };
  } catch (e) {
    console.trace(e);
    return { data: [] };
  }
};

export default HowWork;
