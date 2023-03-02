/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import {
  FindCar as FindCarComponent,
  useViewportDetector,
} from "../../src/Components";
import api, { instance } from "../../src/api";
import {
  formatFilterKeys,
  useAxios,
  prepareCars,
  useEffectOnce,
  classNames,
  preparePeriodsFilters,
  formatValueToApi,
} from "../../src/utils";
import { useCallback, useMemo, useRef, useState } from "react";
import styles from "../../src/Components/FindCar/FindCar.module.scss";
import { Loading } from "../../src/Components/utils/loading";
function FindCar({ data, filters, applyFilters }) {
  const loadingMore = useRef(false);
  const [ref, inViewport, direction] = useViewportDetector();
  const [carsOutput, setCarsOutput] = useState(data || []);
  const [loadEnd, setLoadEnd] = useState(false);
  const [currentFilters, setCurrentFilters] = useState(applyFilters);

  const findCarApi = useAxios({
    url: "organization-vehicles?populate=true&limit=9",
    makeCall: !data?.length,
  });
  const filterApi = useAxios({
    url: "constants?filter=all",
    makeCall: !Object.values(filters).length,
    initData: {
      vehicleBrands: [],
      vehicleCategories: [],
      vehicleFuelTypes: [],
      periods: [],
      ...filters,
    },
  });

  const isDefaultFilters = useMemo(() => {
    return (
      currentFilters.vehicleBrands === "all" &&
      currentFilters.vehicleCategories === "all" &&
      currentFilters.vehicleFuelTypes === "all" &&
      currentFilters.periods === "" &&
      currentFilters.orderBy === ""
    );
  }, [currentFilters]);

  const clearFilters = useCallback(() => {
    setCarsOutput([]);
    findCarApi.call();
    setLoadEnd(false);
    setCurrentFilters({
      vehicleBrands: "all",
      vehicleCategories: "all",
      vehicleFuelTypes: "all",
      periods: "",
      orderBy: "",
    });
  }, [data, findCarApi]);

  const callFindCarApiWidthParams = useCallback(
    (filter, signal) => {
      const params = Object.entries(filter).reduce((output, [key, value]) => {
        if (key === "periods" || key === "orderBy") {
          return { ...output };
        }
        if ((value || "")?.toLowerCase() !== "all") {
          const newKey = formatFilterKeys(key);
          return {
            ...output,
            [newKey]: value,
          };
        }
        return { ...output };
      }, {});

      findCarApi.call({
        params,
        signal,
      });
    },
    [findCarApi]
  );

  const changeFilter = useCallback(
    (filter, value, isLoadMore, signal) => (e) => {
      if (filter !== "periods" && filter !== "orderBy") {
        !isLoadMore && setCarsOutput([]);
        !isLoadMore && setLoadEnd(false);

        callFindCarApiWidthParams(
          {
            ...currentFilters,
            [filter]: value || e.target.value,
          },
          signal
        );
      }

      setCurrentFilters((pre) => ({
        ...pre,
        [filter]: value || e.target.value,
      }));
    },
    [currentFilters, callFindCarApiWidthParams]
  );
  useEffectOnce(() => {
    if (!inViewport || direction === "up" || loadingMore.current || loadEnd) {
      return undefined;
    }
    loadingMore.current = true;
    callFindCarApiWidthParams({
      ...currentFilters,
      skip: `${carsOutput.length}`,
    });
  }, [inViewport, direction, loadEnd]);

  useEffectOnce(() => {
    if (findCarApi.data?.length === 0) {
      setLoadEnd(true);
      return;
    }

    if (findCarApi.loading || !findCarApi.data) {
      return undefined;
    }

    loadingMore.current = false;
    setCarsOutput((prev) => [...prev, ...(findCarApi.data || [])]);
  }, [findCarApi.data]);

  // Fill periods on the filters
  useEffectOnce(() => {
    filterApi.setData((prev) => ({
      ...prev,
      periods: preparePeriodsFilters(carsOutput),
    }));
  }, [carsOutput]);

  // Fill cars data with prices and periods
  useEffectOnce(() => {
    const fetchPrices = async ([id, url], setter) => {
      try {
        const res = await instance({ url });
        setter((prev) => {
          return [...(prev || [])].map((car) => {
            if (car.id === id) {
              return {
                ...car,
                periods: res?.data?.data,
              };
            }

            return car;
          });
        });
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.trace(error);
        }
      }
    };

    const fetchAllPrices = async () => {
      const prices = (findCarApi.data || carsOutput)?.map(({ id }) => [
        id,
        `/organization-vehicle-pricings?vehicleId=${id}`,
      ]);
      await Promise.all(
        prices.map(([id, url]) => {
          fetchPrices([id, url], setCarsOutput);
        })
      );
    };

    fetchAllPrices();
  }, [findCarApi.data]);

  const carData = useMemo(() => {
    const output = prepareCars(
      carsOutput,
      currentFilters.orderBy,
      currentFilters.periods
    );
    return output;
  }, [currentFilters.orderBy, currentFilters.periods, carsOutput]);

  return (
    <>
      <Head>
        <title>Encuentra tu auto favorito 🚘</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FindCarComponent
        loading={findCarApi.loading}
        pricePreLoaded={true}
        data={carData}
        filters={filterApi.data}
        clearFilters={clearFilters}
        isDefaultFilters={isDefaultFilters}
        changeFilter={changeFilter}
        currentFilters={currentFilters}
      />

      <div ref={ref} className={classNames(styles.scrollLoad)}>
        {!loadEnd && <Loading show={inViewport} />}
      </div>
    </>
  );
}

FindCar.getInitialProps = async ({ query }) => {
  try {
    const parmas = Object.entries(query).reduce((output, [key, value]) => {
      return {
        ...output,
        [formatFilterKeys(key)]: formatValueToApi(value),
      };
    }, {});
    const res = await Promise.all([
      api.get("constants?filter=all"),
      api.get("organization-vehicles?populate=true&limit=9", parmas),
    ]);
    const [filters, posts] = res;
    return {
      data: posts?.data?.data,
      filters: filters?.data?.data,
      applyFilters: {
        vehicleBrands: "all",
        vehicleCategories: "all",
        vehicleFuelTypes: "all",
        periods: "",
        orderBy: "",

        ...Object.entries(parmas).reduce((output, [key, value]) => {
          return {
            ...output,
            [formatFilterKeys(key)]: value,
          };
        }, {}),
      },
    };
  } catch (e) {
    console.trace(e);
    return {
      data: [],
      filters: {},
      applyFilters: {
        vehicleBrands: "all",
        vehicleCategories: "all",
        vehicleFuelTypes: "all",
        periods: "",
        orderBy: "",
      },
    };
  }
};
export default FindCar;
