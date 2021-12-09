import Sprite from "./Sprite";
import heroSprite from "./images/characters/people/hero.png";
import OverWorldEvent from "./OverWorldEvent";
import OverWorldMap from "./OverWorldMap";

interface Config {
  id: string;
  isMounted: boolean;
  x: number;
  y: number;
  direction: string;
  sprite: any;
  behaviorLoop: any;
  behaviorLoopIndex: number;
  talking: any;
  isStanding: boolean;
  src: string;
}

class GameObject {
  id: string;
  isMounted: boolean;
  x: number;
  y: number;
  direction: string;
  sprite: any;
  behaviorLoop: any;
  behaviorLoopIndex: number;
  talking: any;
  isStanding: boolean;
  src: string;
  constructor(config: Config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || heroSprite,
    });
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
    this.isStanding = false;
  }

  mount(map: OverWorldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map: OverWorldMap) {
    // Don't do anything if there is a more important cutscene or I don't have config to do anything
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    // Setting up our event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    // Create an event instance out of our next event config
    const eventHandler = new OverWorldEvent({
      map,
      event: eventConfig,
    });
    await eventHandler.init();

    // Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }
    // Do it again!
    this.doBehaviorEvent(map);
  }
}

export default GameObject;
