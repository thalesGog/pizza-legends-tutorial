import DemoLower from "./images/maps/DemoLower.png";
import DemoUpper from "./images/maps/DemoUpper.png";
import KitchenLower from "./images/maps/KitchenLower.png";
import KitchenUpper from "./images/maps/KitchenUpper.png";
import Npc1 from "./images/characters/people/npc1.png";
import Npc2 from "./images/characters/people/npc2.png";

import GameObject from "./GameObject";

export const SCENES = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: new GameObject({
        x: 5,
        y: 6,
      }),
      npc1: new GameObject({
        x: 7,
        y: 9,
        src: Npc1,
      }),
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npc1: new GameObject({
        x: 9,
        y: 6,
        src: Npc1,
      }),
      npc2: new GameObject({
        x: 10,
        y: 8,
        src: Npc2,
      }),
    },
  },
};
