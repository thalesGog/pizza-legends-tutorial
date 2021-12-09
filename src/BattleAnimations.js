import { wait } from "./utils";

const spin = async (event, onComplete) => {
  const element = event.caster.pizzaElement;
  const animationClassName =
    event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
  element.classList.add(animationClassName);

  // Remove class when animation is fully complete
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove(animationClassName);
    },
    { once: true }
  );

  // Continue battle cycle right around when the pizzas collide
  await wait(100);
  onComplete();
};

export { spin };
