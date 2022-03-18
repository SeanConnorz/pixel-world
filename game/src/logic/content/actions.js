export const loadActions = () => {
  window.Actions = {
    damage1: {
      name: "Whomp!",
      success: [
        {
          type: "textMessage",
          text: "{CASTER} uses Whomp!",
        },
      ],
    },
  };
};
