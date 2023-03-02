import HandOneFinger from "../../svg/hand-one-finger.svg";
import HandTwoFingers from "../../svg/hand-two-fingers.svg";
import HandTreeFingers from "../../svg/hand-tree-fingers.svg";
import HandFourFingers from "../../svg/hand-four-fingers.svg";
import { FAQStaticText } from "../utils/static-texts";

export const FAQInitialStates = () => {
  return Object.keys(FAQStaticText).reduce((acc, current, index) => {
    if (index === 1) return { [acc]: false, [current]: false };
    return { ...acc, [current]: false };
  });
};

export const steps = [
  {
    id: 0,
    img: HandOneFinger,
    title: "Selecciona tu auto",
    subtitle: "Elige el auto y plazo que más se adecúe a ti",
    desc: "Selecciona el auto y el plazo de suscripción que más se adecúe a tus necesidades. Contamos con 4 tipos de vehículos ( Hatchback, Sedan, SUV y Pick Up ) nuevos y semi nuevos para que puedas elegir acorde a tus preferencias y prioridades.",
  },
  {
    id: 1,
    img: HandTwoFingers,
    title: "Regístrate",
    subtitle: "Completa el formulario y te contactaremos en 48 hrs",
    desc: "Ingresa los datos en el formulario de solicitud de suscripción y uno de nuestros ejecutivos connect car te contactará para que avances con la contratación del servicio y puedas tener tu auto lo antes posible.",
  },
  {
    id: 2,
    img: HandTreeFingers,
    title: "Completa la suscripción",
    subtitle: "Sube la información requerida para tu evaluación",
    desc: "Te pediremos que nos envíes una serie de documentos para que podamos ver si cumples con las condiciones de contrato y darte así la bienvenida a connect car. Nos demoramos menos de 24 horas hábiles en evaluar tu solicitud.",
  },
  {
    id: 3,
    img: HandFourFingers,
    title: "Maneja y disfruta",
    subtitle: "Te entregamos tu auto donde tú quieras",
    desc: "¡Si estás en el paso 4 significa que ya eres parte de connect car! Te contactaremos para coordinar la entrega de tu auto donde quieras y así puedas empezar a vivir la experiencia connect car.",
  },
];
