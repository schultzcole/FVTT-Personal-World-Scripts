// This script will change the default token configuration for newly created or imported actors
//   (does not affect actors already in the world).
// It changes the following:
// - Show the token's name when an owner of the token hovers over it
// - Always show all resource bars for owners of the token
// - Sets the first bar to display the token's hit points (dnd5e)
Hooks.on("preCreateActor", (actorData, options, userId) => {
  actorData.token = actorData.token ?? {};
  
  const displayBars = actorData.type === "character"
    ? CONST.TOKEN_DISPLAY_MODES.OWNER
    : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;
  
  mergeObject(actorData.token, {
    displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
    displayBars,
    bar1: { attribute: "attributes.hp" },
    bar2: { attribute: null },
  });
});
