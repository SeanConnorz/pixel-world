import { TextMessage } from "../TextMessage";

export class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => {
        resolve();
      },
    });
    const container = document.querySelector(".game-container");
    message.init(container);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
