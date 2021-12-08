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
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy...", faceHero: "npc1" },
              { type: "textMessage", text: "Go away!" },
              { who: "hero", type: "walk", direction: "up" },
            ],
          },
        ],
      }),
      npc2: new Person({
        x: withGrid(8),
        y: withGrid(5),
        src: Npc2,
        //behaviorLoop: [
        //  { type: "walk", direction: "left" },
        //  { type: "walk", direction: "up" },
        //  { type: "walk", direction: "right" },
        //  { type: "walk", direction: "down" },
        //],
      }),
    },
    walls: {
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npc2", type: "walk", direction: "left" },
            { who: "npc2", type: "stand", direction: "up", time: 500 },
            { type: "textMessage", text: "You can't be in there!" },
            { who: "npc2", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
            { who: "hero", type: "walk", direction: "left" },
          ],
        },
      ],
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
