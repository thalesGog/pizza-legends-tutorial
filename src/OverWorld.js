import { SCENES } from "./constants";
import DirectionInput from "./DirectionInput";
import KeyPressListener from "./KeyPressListener";
import OverWorldMap from "./OverWorldMap";

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Establish the camera person

      const cameraPerson = this.map.gameObjects.hero;

      // Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Draw Lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => a.y - b.y)
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      // Draw Lower Layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActinInput() {
    new KeyPressListener("Enter", () => {
      // Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositonCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if(e.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene()
      }
    })
  }


  init() {
    this.map = new OverWorldMap(SCENES.DemoRoom);
    this.map.mountObjects();

    this.bindActinInput();
    this.bindHeroPositonCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    /**
     * this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npc1", type: "walk", direction: "up" },
      { who: "npc1", type: "walk", direction: "left" },
      { who: "hero", type: "stand", direction: "right", time: 200 },
      { type: "textMessage", text: "HELLO THERE!" },
    ]);
     */
  }
}

export default Overworld;
