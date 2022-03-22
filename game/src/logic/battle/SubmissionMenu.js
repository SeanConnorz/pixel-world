import { KeyboardMenu } from "../KeyboardMenu";

export class SubmissionMenu {
  constructor({ caster, enemy, onComplete, replacements }) {
    this.caster = caster;
    this.enemy = enemy;
    this.replacements = replacements;
    this.onComplete = onComplete;
  }

  getPages() {
    const backOption = {
      label: "Go Back",
      description: "Return to previous pages",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root);
      },
    };

    return {
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().attacks);
          },
        },
        {
          label: "Items",
          disabled: true,
          description: "Choose an item",
          handler: () => {
            console.log("OPENS ITEMS MENU");
          },
        },
        {
          label: "Swap",
          description: "Change to another minion",
          handler: () => {
            this.keyboardMenu.setOptions(this.getPages().replacements);
          },
        },
      ],
      attacks: [
        ...this.caster.actions.map((key) => {
          const action = window.Actions[key];
          const actionObj = {
            label: action.name,
            description: action.description,
            handler: () => {
              this.menuSubmit(action);
            },
          };
          return actionObj;
        }),
        backOption,
      ],
      items: [
        {
          label: "Potion",
          description: "Item 1",
          handler: () => {
            //
          },
        },
        backOption,
      ],
      replacements: [
        ...this.replacements.map((replacement) => {
          return {
            label: replacement.name,
            description: replacement.description,
            handler: () => {
              // Swap me
              this.menuSubmitReplacement(replacement);
            },
          };
        }),
      ],
    };
  }

  menuSubmitReplacement(replacement) {
    this.keyboardMenu?.end();
    this.onComplete({
      replacement,
    });
  }

  menuSubmit(action, instanceId = null) {
    this.keyboardMenu?.end();

    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
    });
  }

  decide() {
    this.menuSubmit(window.Actions[this.caster.actions[0]]);
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
