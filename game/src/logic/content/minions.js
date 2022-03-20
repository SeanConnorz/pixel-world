export const minionTypes = () => {
  window.MinionTypes = {
    boy: "boy",
  };

  window.Minions = {
    s001: {
      name: "Slayer",
      type: window.MinionTypes.boy,
      src: require("../../images/c001.png"),
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png",
      actions: ["saucyStatus", "damage1"],
    },
    s002: {
      name: "npc",
      type: window.MinionTypes.boy,
      src: require("../../images/c001.png"),
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png",
      actions: ["saucyStatus", "damage1"],
    },
  };
};
