export const loadActions = () => {
  window.Actions = {
    damage1: {
      name: "Whomp!",
      success: [
        {
          type: "textMessage",
          text: "{CASTER} uses Whomp!",
        },
        { type: "stateChange", damage: 10 },
        { type: "animation", animation: "spin" },
      ],
      description: "Whomp em!",
    },
    saucyStatus: {
      name: "Tomato Squeeze",
      targetType: "friendly",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
        { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
      ],
      description: "Heals you every turn",
    },
    clumsyStatus: {
      name: "Olive Oil",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
        { type: "animation", animation: "glob", color: "#dafd2a" },
        { type: "stateChange", status: { type: "clumbsy", expiresIn: 3 } },
      ],
      description: "Gives a 1/3 chance the opponents next move will do nothing",
    },
  };
};
