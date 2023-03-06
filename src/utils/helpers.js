import { formatCardsCar, formatFuel, formatPeriodKeyToApi } from "./formatters";

const functionalComposition =
  (...functions) =>
  (...input) => {
    return functions.reduce((acc, fn) => fn(acc), input);
  };

export function notFoundFilters(currentFilters) {
  let notFound = "No conseguimos ningún vehiculo ";

  if (currentFilters.vehicleCategories !== "all") {
    notFound += currentFilters.vehicleCategories + " ";
  }

  if (currentFilters.vehicleBrands !== "all") {
    notFound += currentFilters.vehicleBrands + " ";
  }

  if (currentFilters.vehicleFuelTypes !== "all") {
    switch (currentFilters.vehicleFuelTypes) {
      case "ELECTRIC":
        notFound += "" + formatFuel(currentFilters.vehicleFuelTypes) + " ";
        break;
      default:
        notFound += "a " + formatFuel(currentFilters.vehicleFuelTypes) + " ";
        break;
    }
  }

  notFound += ", puede intentar:";
  return notFound;
}

export function sortPeriods(periods) {
  return periods.sort((x, y) => {
    let a = x;
    let b = y;
    if (typeof a !== "string") {
      const { periodType: aPeriodType, periodsAmount: aPeriodsAmount } = a;
      const { periodType: bPeriodType, periodsAmount: bPeriodsAmount } = b;
      a = `${aPeriodsAmount}_${aPeriodType[0]}`;
      b = `${bPeriodsAmount}_${bPeriodType[0]}`;
    }

    let aNum = parseInt(a.split("_")[0]);
    let bNum = parseInt(b.split("_")[0]);
    let aUnit = a.split("_")[1];
    let bUnit = b.split("_")[1];

    if (aUnit.toLowerCase().includes("y")) {
      aNum *= 12;
    } else if (aUnit.toLowerCase().includes("w")) {
      aNum /= 4;
    }

    if (bUnit.toLowerCase().includes("y")) {
      bNum *= 12;
    } else if (bUnit.toLowerCase().includes("w")) {
      bNum /= 4;
    }

    if (aUnit.toLowerCase().includes("m")) {
      aNum += 1;
    }

    if (bUnit.toLowerCase().includes("m")) {
      bNum += 1;
    }

    return bNum - aNum;
  });
}

export const getPeriods = ([filter]) => {
  const periods = (filter || [])?.reduce((output, { periods }) => {
    const period = (periods || [])?.map(({ periodType, periodsAmount }) => {
      return `${periodsAmount}_${periodType[0]}`;
    });

    return [...new Set([...output, ...period])].sort();
  }, []);

  return periods;
};
export const preparePeriodsFilters = functionalComposition(
  getPeriods,
  sortPeriods,
);

export function getPrice(prices, type, amount) {
  const periods =
    type && amount
      ? prices.find(
          (price) =>
            price?.periodType.toLowerCase() === type.toLowerCase() &&
            price?.periodsAmount === amount,
        )
      : prices[0];
  return {
    amount: periods?.periodPrice || 0,
    type: periods?.periodType || "",
  };
}

const orderByFilter = ([data, filter, time, period]) => {
  let dataFileted = [];
  switch (filter) {
    case "higher_price":
    case "less_price":
      dataFileted = [...(data || [])].sort((a, b) =>
        filter === "less_price"
          ? (a.priceData?.amount || 0) - (b.priceData?.amount || 0)
          : (b.priceData?.amount || 0) - (a.priceData?.amount || 0),
      );
      break;
    case "less_year":
    case "higher_year":
      dataFileted = [...(data || [])].sort((a, b) =>
        filter === "less_year"
          ? a.raw.year - b.raw.year
          : b.raw.year - a.raw.year,
      );
      break;
    case "type":
      dataFileted = [...(data || [])].sort((a, b) =>
        a.raw.category < b.raw.category
          ? -1
          : a.raw.category > b.raw.category
          ? 1
          : 0,
      );
      break;
    default:
      dataFileted = data;
  }

  return [dataFileted, filter, time, period];
};

function fillPrice([data, filter, time, period]) {
  return [
    data?.map(({ periods, ...car }) => {
      return {
        ...car,
        periods,
        priceData: getPrice(
          periods || [{ periodPrice: 0, periodType: "" }],
          formatPeriodKeyToApi(period),
          time * 1 === 0 ? undefined : time * 1,
        ),
      };
    }),
    filter,
    time,
    period,
  ];
}

function carsFormatter([data, filter, time, period]) {
  return [[...data]?.map(formatCardsCar), filter, time, period];
}

function clearZeroPrice([data]) {
  return data?.filter(({ priceData }) => {
    return (priceData?.amount || 0) !== 0;
  });
}

function preparePeriods([data, filter, periods]) {
  const [time, period] = periods.split("_");
  return [data, filter, time, period];
}

export const isTruthy = (value) => !!value && value !== "undefined";

export const prepareCars = functionalComposition(
  preparePeriods,
  carsFormatter,
  fillPrice,
  orderByFilter,
  clearZeroPrice,
);

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
