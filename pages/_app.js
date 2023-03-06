import { useEffect, useState } from "react";
import "../src/styles/globals.scss";
import { Navbar, Footer } from "../src/Components";
import { classNames } from "../src/utils";
import { SSRProvider } from "react-bootstrap";
import { useRouter } from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "/src/styles/nprogress.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
      NProgress.start();
    };

    const handleStop = () => {
      setPageLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SSRProvider>
      {getLayout(
        <main className={classNames(pageLoading && "globalLoading")}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </main>,
      )}
    </SSRProvider>
  );
}
