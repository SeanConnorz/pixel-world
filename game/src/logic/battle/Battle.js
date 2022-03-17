import { Combatant } from "./Combatant";

export class Battle {
  constructor() {
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
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...window.Minions["s001"],
          team: "enemy",
          hp: 50,
          maxHp: 50,
          xp: 20,
          maxXP: 100,
          level: 1,
        },
        this
      ),
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

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });
  }
}
