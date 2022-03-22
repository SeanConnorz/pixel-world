import { Combatant } from "./Combatant";
import { TurnCycle } from "./TurnCycle";
import { BattleEvent } from "./BattleEvent";

export class Battle {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.combatants = {
      player1: new Combatant(
        {
          ...window.Minions["s001"],
          team: "player",
          hp: 50,
          maxHp: 50,
          xp: 0,
          level: 1,
          status: null,
          isPlayerControlled: true,
        },
        this
      ),
      player2: new Combatant(
        {
          ...window.Minions["s003"],
          team: "player",
          hp: 50,
          maxHp: 50,
          xp: 0,
          level: 1,
          status: null,
          isPlayerControlled: true,
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...window.Minions["s002"],
          team: "enemy",
          hp: 1,
          maxHp: 50,
          xp: 20,
          maxXP: 100,
          level: 1,
        },
        this
      ),
      enemy2: new Combatant(
        {
          ...window.Minions["s001"],
          team: "enemy",
          hp: 1,
          maxHp: 50,
          xp: 20,
          maxXP: 100,
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
        <img src="${"https://storage.opensea.io/files/ad699c038419e64e0370c2cde2e0bb5c.png"}"/>
      </div>
      <div class="Battle_enemy">
        <img src="${"https://storage.opensea.io/files/ad699c038419e64e0370c2cde2e0bb5c.png"}"/>
      </div>
    `;
  }

  endBattle() {
    this.element.remove();
    this.onComplete();
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
