import { TextMessage } from "../TextMessage";
import { SubmissionMenu } from "./SubmissionMenu";
import { utils } from "../utils";
import { ReplacementMenu } from "./ReplacementMenu";

export class BattleEvent {
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
    const container = document.querySelector(".game-container");
    message.init(container);
  }

  async stateChange(resolve) {
    const { caster, target, damage, recover, status, action } = this.event;
    let who = this.event.onCaster ? caster : target;

    if (damage) {
      // Modify target to reduce HP
      target.update({
        hp: target.hp - damage,
      });

      // Start blinking
      target.minionElement.classList.add("battle-damage-blink");
    }

    if (recover) {
      let newHp = who.hp + recover;
      if (newHp > who.maxHp) {
        newHp = who.maxHp;
      }
      who.update({
        hp: newHp,
      });
    }

    if (status) {
      who.update({
        status: { ...status },
      });
    }

    if (status === null) {
      who.update({
        status: null,
      });
    }

    // Wait
    await utils.wait(600);

    // Stop blinking

    target.minionElement.classList.remove("battle-damage-blink");
    resolve();
  }

  submissionMenu(resolve) {
    const { caster } = this.event;
    const menu = new SubmissionMenu({
      caster,
      enemy: this.event.enemy,
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return (
          c.id !== this.event.caster.id && c.team === caster.team && c.hp > 0
        );
      }),
      onComplete: (submission) => {
        // Submission what move to use, who to use it on
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  replacementMenu(resolve) {
    const menu = new ReplacementMenu({
      replacements: Object.values(this.battle.combatants).filter((c) => {
        return c.team === this.event.team && c.hp > 0;
      }),
      onComplete: (replacement) => {
        resolve(replacement);
      },
    });
    menu.init(this.battle.element);
  }

  async replace(resolve) {
    const { replacement } = this.event;

    // Clear out the old combatant
    const prevCombatant =
      this.battle.combatants[this.battle.activeCombatants[replacement.team]];
    this.battle.activeCombatants[replacement.team] = null;
    prevCombatant.update();
    await utils.wait(400);

    // In with the new!
    this.battle.activeCombatants[replacement.team] = replacement.id;
    replacement.update();
    await utils.wait(400);

    resolve();
  }

  animation(resolve) {
    const fn = window.BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
