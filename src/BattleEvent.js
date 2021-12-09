import SubmissionMenu from "./Battle/SubmissionMenu";
import TextMessage from "./TextMessage";
import { wait } from "./utils";
import { spin } from "./BattleAnimations";

class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);
    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage } = this.event;
    if (damage) {
      // Modify the target to have less HP
      target.update({
        hp: target.hp - damage,
      });
      // Start blinking
      target.pizzaElement.classList.add("battle-damage-blink");
    }

    // Wait a little bit
    await wait(600);

    // Stop blinking
    target.pizzaElement.classList.remove("battle-damage-blink");
    resolve();
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  animation(resolve) {
    spin(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}

export default BattleEvent;
