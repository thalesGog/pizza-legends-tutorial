import "../styles/Battle.css";

import hero from "../images/characters/people/hero.png";
import npc3 from "../images/characters/people/npc3.png";
import Combatant from "./Combatant";
import { Pizzas } from "../Content/pizzas";
import TurnCycle from "../TurnCycle";
import BattleEvent from "../BattleEvent";

class Battle {
  constructor() {
    this.combatants = {
      player1: new Combatant(
        {
          ...Pizzas.s001,
          team: "player",
          hp: 50,
          maxHp: 50,
          xp: 0,
          maxXp: 100,
          level: 1,
          status: null,
          isPlayerControlled: true,
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Pizzas.v001,
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 20,
          maxXp: 100,
          level: 1,
        },
        this
      ),
      enemy2: new Combatant(
        {
          ...Pizzas.f001,
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 30,
          maxXp: 100,
          level: 1,
        },
        this
      ),
    };
    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1",
    };
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `
        <div class="Battle_hero">
            <img src=${hero} alt="hero" />
        </div>
        <div class="Battle_enemy">
            <img src=${npc3} alt="Enemy" />
        </div>
    `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });

    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
    });
    this.turnCycle.init();
  }
}

export default Battle;
