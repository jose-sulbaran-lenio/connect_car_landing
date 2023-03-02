import { CarDetails } from "../../src/Components/CarDetails/CarDetails";
import { formatCardsCar, isObjEmpty, isTruthy } from "../../src/utils";
import api from "../../src/api";
import Error from "next/error";

function BrandModelVersionCar({ data, details }) {
  if (isObjEmpty(details)) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <CarDetails cars={data} details={details} />
    </>
  );
}

BrandModelVersionCar.getInitialProps = async ({ query }) => {
  try {
    const [brand, model, version, year] = query.car;
    const formattedBrand = brand.replaceAll("_", " ");
    const formattedModel = model.replaceAll("_", " ");
    let formattedVersion = version.replaceAll("_", " ");
    let formattedYear = parseInt(year);
    if (!formattedYear) {
      formattedYear = parseInt(formattedVersion);
      formattedVersion = "";
    }
    let params = {
      ...(isTruthy(brand) && { "vehicleId.brand": formattedBrand }),
      ...(isTruthy(model) && { "vehicleId.model": formattedModel }),
      ...(isTruthy(version) && {
        "vehicleId.version": formattedVersion,
      }),
    };
    const res = await Promise.all([
      api.get("organization-vehicles?sort=random&populate=true&limit=3"),
      api.get("organization-vehicles?populate=true", params),
    ]);
    const carDetailsYear = [
      res[1]?.data?.data.find(
        (element) => element.vehicleId.year === formattedYear,
      ),
    ].filter((e) => e);
    const data = res[0]?.data?.data?.map(formatCardsCar);
    let details = {};
    if (carDetailsYear.length > 0)
      details = carDetailsYear.map(formatCardsCar)[0];
    return {
      data,
      details,
    };
  } catch (e) {
    console.trace(e);
    return { data: [], details: {} };
  }
};

export default BrandModelVersionCar;
