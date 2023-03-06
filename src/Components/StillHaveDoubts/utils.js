import { FAQStaticText } from "../utils/static-texts";

export const FAQInitialStates = () => {
  return Object.keys(FAQStaticText).reduce((acc, current, index) => {
    if (index === 1) return { [acc]: false, [current]: false };
    return { ...acc, [current]: false };
  });
};
