export class KeyboardMenu {
  constructor() {
    this.options = [];
    this.up = null;
    this.down = null;
    this.prevFocus = null;
  }

  setOptions(options) {
    this.options = options;
    this.element.innerHTML = this.options
      .map((option, index) => {
        const disabledAttr = option.disabled ? "disabled" : "";
        return `
        <div>
          <button ${disabledAttr} data-option="${index}" data-description="${
          option.descripition
        }">
            ${option.label}
          </button>
          <span class="right">${option.right ? option.right() : ""}</span>
        </div>
      `;
      })
      .join("");
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("KeyboardMenu");
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
