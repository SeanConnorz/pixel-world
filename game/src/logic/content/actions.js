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
    },
    saucyStatus: {
      name: "Tomato Squeeze",
      targetType: "friendly",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
        { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
      ],
    },
    saucyStatus: {
      name: "Olive Oil",
      targetType: "friendly",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
        { type: "stateChange", status: { type: "clumbsy", expiresIn: 3 } },
      ],
    },
  };
};
