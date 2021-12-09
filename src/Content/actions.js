const Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      // { type: "animation", animation: "willBeDefinedHere"},
      { type: "stateChange", damage: 10 },
    ],
  },
};

export default Actions;
