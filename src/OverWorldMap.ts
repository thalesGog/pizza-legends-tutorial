import OverWorldEvent from "./OverWorldEvent";
import { nextPosition, withGrid } from "./utils";

export interface Config {
  overworld: any;
  gameObjects: any;
  cutsceneSpaces: any;
  walls: any;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  lowerSrc: string;
  upperSrc: string;
}

class OverWorldMap {
  overworld: any;
  gameObjects: any;
  cutsceneSpaces: any;
  walls: any;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  isCutscenePlaying: boolean;
  constructor(config: Config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: any) {
    ctx.drawImage(
      this.lowerImage,
      withGrid(10.5) - cameraPerson.x,
      withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: any) {
    ctx.drawImage(
      this.upperImage,
      withGrid(10.5) - cameraPerson.x,
      withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      object.mount(this);
    });
  }

  async startCutscene(events: any) {
    this.isCutscenePlaying = true;
    // Start a loop of async events and await each one
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverWorldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }
    this.isCutscenePlaying = false;

    // Reset NPC's to do their idle behavior
    Object.values(this.gameObjects).forEach((object: any) =>
      object.doBehaviorEvent(this)
    );
  }

  checkForActionCutscene() {
    const hero = this.gameObjects.hero;
    const nextCoords = nextPosition(hero.x, hero.y, hero.direction);
    const match: any = Object.values(this.gameObjects).find((object: any) => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX: number, wasY: number, direction: string) {
    this.removeWall(wasX, wasY);
    const { x, y } = nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

export default OverWorldMap;
