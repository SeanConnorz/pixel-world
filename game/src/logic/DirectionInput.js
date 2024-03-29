export class DirectionInput {
  constructor() {
    this.heldDirections = [];

    // Convert keyboard input into string
    this.map = {
      KeyW: "up",
      KeyA: "left",
      KeyS: "down",
      KeyD: "right",
      ArrowUp: "up",
      ArrowLeft: "left",
      ArrowDown: "down",
      ArrowRight: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    // Maps keyinput to human readable string
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
