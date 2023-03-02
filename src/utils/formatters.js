import { ORDER_BY } from "./constants";

export function formatFuel(vehicleFuel = "") {
  let fuel = "Eléctrico";
  if (vehicleFuel.toLowerCase() === "gasoline") {
    fuel = "Gasolina";
  } else if (vehicleFuel.toLowerCase() === "diesel") {
    fuel = "Diesel";
  } else if (vehicleFuel.toLowerCase() === "all") {
    fuel = "Todos";
  }

  return fuel;
}

export function formatTransmission(vehicleTransmission = "") {
  let transmission = "Automático";
  if (vehicleTransmission.toLowerCase() === "manual") {
    transmission = "Manual";
  }

  return transmission;
}

export function formatCardsCar(car) {
  const vehicle = car?.vehicleId;
  return {
    ...car,
    raw: vehicle,
    id: vehicle?.id,
    vehicleId: car?.id,
    eco: formatFuel(vehicle?.fuel) === "Eléctrico",
    title: vehicle?.brand,
    subTitle: vehicle?.model,
    carImageSrc: `/vehicle-file-download-url?vehicleId=${car?.id}&documentId=IMAGE_PRIMARY`,
    specs: [
      { title: "Año", value: vehicle?.year },
      { title: "Capacidad", value: `${vehicle?.seats} pasajeros` },
      { title: "Categoría", value: vehicle?.category },
      { title: "Motor", value: vehicle?.engine },
      {
        title: "Combustible",
        value: formatFuel(vehicle?.fuel),
      },
      {
        title: "Transmisión",
        value: formatTransmission(vehicle?.transmission),
      },
    ],
    price: `/organization-vehicle-pricings?vehicleId=${car?.id}`,
    onClick: `/find-car/${vehicle?.brand || ""}/${vehicle?.model || ""}/${
      vehicle?.version || ""
    }/${vehicle?.year || ""}`,
    exterior: vehicle.detailExterior,
    interior: vehicle.detailInterior,
    security: vehicle.detailSecurity,
    technical: vehicle.detailTechnical,
  };
}

export function formatFilterKeys(key) {
  switch (key) {
    case "vehicleId.brand":
      return "vehicleBrands";
    case "vehicleId.category":
      return "vehicleCategories";
    case "vehicleId.fuel":
      return "vehicleFuelTypes";
    case "brand":
    case "vehicleBrands":
      return "vehicleId.brand";
    case "category":
    case "vehicleCategories":
      return "vehicleId.category";
    case "fuel":
    case "vehicleFuelTypes":
      return "vehicleId.fuel";
    case "sort":
      return "sort";
    case "limit":
      return "limit";
    case "populate":
      return "populate";
    case "select":
      return "select";
    case "order":
      return "order";
    case "skip":
      return "skip";
    default:
      return `vehicleId.${key}`;
  }
}

export function formatFilterTitle(key) {
  switch (key) {
    case "vehicleBrands":
      return "Marca";
    case "vehicleCategories":
      return "Categoría";
    case "vehicleFuelTypes":
      return "Combustible";
    case "periods":
      return "Periodo";
    case "orderBy":
      return "Ordenar por";
    default:
      return `${key}`;
  }
}

export function formatPeriodKeyToApi(key) {
  switch ((key || "").toLowerCase()) {
    case "m":
      return "month";
    case "y":
      return "year";
    case "w":
      return "week";
    case "d":
      return "day";
  }
}

export function formatOrderBy(key) {
  if (ORDER_BY[0] === key) {
    return "Precio menor a mayor";
  }
  if (ORDER_BY[1] === key) {
    return "Precio mayor a menor";
  }
  if (ORDER_BY[2] === key) {
    return "Año menor a mayor";
  }
  if (ORDER_BY[3] === key) {
    return "Año mayor a menor";
  }
  if (ORDER_BY[4] === key) {
    return "Tipo";
  }
  return key;
}

export function formatPeriodKey(key) {
  const [amount, period] = key.split("_");
  switch ((period || "").toLowerCase()) {
    case "m":
      if (amount === 1) {
        return `${amount} Mes`;
      }
      if (!amount) {
        return `Meses`;
      }
      return `${amount} Meses`;
    case "y":
      if (amount === 1) {
        return `${amount} Año`;
      }
      if (!amount) {
        return `Años`;
      }
      return `${amount} Años`;
    case "d":
      if (amount === 1) {
        return `${amount} Día`;
      }
      if (!amount) {
        return `Dias`;
      }
      return `${amount} Dias`;
    case "w":
      if (amount === 1) {
        return `${amount} Semana`;
      }
      if (!amount) {
        return `Semanas`;
      }
      return `${amount} Semanas`;
  }
}

export function formatPeriod(periodType, amount) {
  const period = periodType?.toLowerCase();
  switch (period) {
    case "month":
      if (amount === 1) {
        return `${amount} Mes`;
      }
      if (!amount) {
        return `Meses`;
      }
      return `${amount} Meses`;
    case "year":
      if (amount === 1) {
        return `${amount} Año`;
      }
      if (!amount) {
        return `Años`;
      }
      return `${amount} Años`;
    case "day":
      if (amount === 1) {
        return `${amount} Día`;
      }
      if (!amount) {
        return `Dias`;
      }
      return `${amount} Dias`;
    case "week":
      if (amount === 1) {
        return `${amount} Semana`;
      }
      if (!amount) {
        return `Semanas`;
      }
      return `${amount} Semanas`;
  }
}

export function formatDuration(periodType) {
  const period = periodType?.toLowerCase();
  switch (period) {
    case "month":
      return `mensual`;
    case "year":
      return `anual`;
    case "day":
      return `diario`;
    case "week":
      return `semanal`;
  }
}
export function formatValueToApi(fuel) {
  switch (fuel) {
    case "electric":
      return `ELECTRIC`;
    case "diesel":
      return `DIESEL`;
    case "hatchback":
      return `Hatchback`;
    case "suv":
      return `SUV`;
    case "pickUp":
    case "pick-up":
    case "pick_up":
    case "pickup":
      return `Pick Up`;
    case "sedan":
      return `Sedan`;
    default:
      return fuel;
  }
}
