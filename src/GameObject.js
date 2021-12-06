import Sprite from "./Sprite";
import hero from "./images/characters/people/hero.png";

class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || hero,
    });
  }
}

export default GameObject;
