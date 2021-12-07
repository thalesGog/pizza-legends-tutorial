import DemoLower from "./images/maps/DemoLower.png";
import DemoUpper from "./images/maps/DemoUpper.png";
import KitchenLower from "./images/maps/KitchenLower.png";
import KitchenUpper from "./images/maps/KitchenUpper.png";
import Npc1 from "./images/characters/people/npc1.png";
import Npc2 from "./images/characters/people/npc2.png";

import Person from "./Person";

import { withGrid, asGridCoord } from "./utils";

export const SCENES = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: withGrid(5),
        y: withGrid(6),
      }),
      npc1: new Person({
        x: withGrid(7),
        y: withGrid(9),
        src: Npc1,
      }),
    },
    walls: {
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new Person({
        x: 3,
        y: 5,
      }),
      npc1: new Person({
        x: 9,
        y: 6,
        src: Npc1,
      }),
      npc2: new Person({
        x: 10,
        y: 8,
        src: Npc2,
      }),
    },
  },
};
