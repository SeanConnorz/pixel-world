import { KeyboardMenu } from "../KeyboardMenu";

export class ReplacementMenu {
  constructor({ replacements, onComplete }) {
    this.replacements = replacements;
    this.onComplete = onComplete;
  }

  decide() {
    this.menuSubmit(this.replacements[0]);
  }

  menuSubmit(replacement) {
    this.keyboarMenu?.end();
    this.onComplete(replacement);
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(
      this.replacements.map((c) => {
        return {
          label: c.name,
          description: c.description,
          handler: () => {
            this.menuSubmit(c);
          },
        };
      })
    );
  }

  init(container) {
    if (this.replacements[0].isPlayerControlled) {
      this.showMenu(container);
    }
    this.decide();
  }
}
