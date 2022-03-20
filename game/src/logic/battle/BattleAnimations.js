import { utils } from "../utils";

export const loadBattleAnimations = () => {
  window.BattleAnimations = {
    async spin(event, onComplete) {
      const element = event.caster.minionElement;
      const animationClassName =
        event.caster.team === "player"
          ? "battle-spin-right"
          : "battle-spin-left";
      element.classList.add(animationClassName);

      // Remove class when animation is fully complete
      element.addEventListener(
        "animatonend",
        () => {
          element.classList.remove(animationClassName);
        },
        { once: true }
      );

      // Continue battle cycle right around when the pizza's collide
      await utils.wait(100);
      onComplete();
    },
    async glob(event, onComplete) {},
  };
};
