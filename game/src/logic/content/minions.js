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
      actions: ["saucyStatus", "clumsyStatus", "damage1"],
    },
    s002: {
      name: "Slice samuri",
      type: window.MinionTypes.boy,
      src: require("../../images/c001.png"),
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png",
      actions: ["clumsyStatus", "damage1"],
    },
    s003: {
      name: "Myan Brian",
      description: "the Mian brian...",
      type: window.MinionTypes.boy,
      src: require("../../images/c001.png"),
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png",
      actions: ["clumsyStatus", "damage1"],
    },
  };
};
