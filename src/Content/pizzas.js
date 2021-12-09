import s001 from "../images/characters/pizzas/s001.png";
import v001 from "../images/characters/pizzas/v001.png";
import f001 from "../images/characters/pizzas/f001.png";

import spicy from "../images/icons/spicy.png";
import veggie from "../images/icons/veggie.png";
import fungi from "../images/icons/fungi.png";

const PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

const Pizzas = {
  s001: {
    name: "Slice Samurai",
    type: PizzaTypes.spicy,
    src: s001,
    icon: spicy,
  },
  v001: {
    name: "Call Me Kale",
    type: PizzaTypes.veggie,
    src: v001,
    icon: veggie,
  },
  f001: {
    name: "Portobello Express",
    type: PizzaTypes.fungi,
    src: f001,
    icon: fungi,
  },
};

export { PizzaTypes, Pizzas };
