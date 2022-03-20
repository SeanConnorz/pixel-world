import { KeyboardMenu } from "../KeyboardMenu";

export class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  getPages() {
    return {
      root: [
        { label: "Attack", description: "Choose an attack", handler: () => {} },
        { label: "Items", description: "Choose an item", handler: () => {} },
        {
          label: "Swap",
          description: "Change to another minion",
          disabled: true,
          handler: () => {},
        },
      ],
      attacks: [],
    };
  }

  decide() {
    this.onComplete({
      action: window.Actions[this.caster.actions[0]],
      target: this.enemy,
    });
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(this.getPages().root);
  }

  init(container) {
    if (this.caster.isPlayerControlled) {
      // Show UI
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
