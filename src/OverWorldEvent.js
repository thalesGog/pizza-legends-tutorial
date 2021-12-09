import { SCENES } from "./constants";
import SceneTransition from "./SceneTransition";
import TextMessage from "./TextMessage";
import { oppositeDirection } from "./utils";

class OverWorldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      { map: this.map },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );
    // Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior(
      { map: this.map },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );
    // Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };

    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const object = this.map.gameObjects[this.event.faceHero];
      object.direction = oppositeDirection(
        this.map.gameObjects["hero"].direction
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    const sceneTransiton = new SceneTransition();
    sceneTransiton.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(SCENES[this.event.map]);
      resolve();
      sceneTransiton.fadeOut();
    });
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}

export default OverWorldEvent;
