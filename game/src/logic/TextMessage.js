import { KeyPressListener } from "./KeyPressListener";

export class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    //Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");
    this.element.classList.add("z-10");

    this.element.innerHTML = `
    <p class="TextMessage_p text-[0.3rem] z-10">${this.text}</p>
    <button class="text-[0.5rem]">Next</button>
    `;

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind();
      this.done();
    });
  }

  done() {
    this.element.remove();
    this.onComplete();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
