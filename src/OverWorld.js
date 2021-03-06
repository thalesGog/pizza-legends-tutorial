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
      if (e.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    this.map = new OverWorldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(SCENES.Kitchen);

    this.bindActinInput();
    this.bindHeroPositonCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { type: "battle" },
      // { type: "changeMap", map: "DemoRoom" },
      // { type: "textMessage", text: "This is the very first message!" },
    ]);
  }
}

export default Overworld;
