// This script will change the default token configuration for newly created or imported actors
//   (does not affect actors already in the world).
// It changes the following:
// - Show the token's name when an owner of the token hovers over it
// - Always show all resource bars for owners of the token
// - Sets the first bar to display the token's hit points (dnd5e)
Hooks.on("preCreateActor", (actorData, options, userId) => {
  mergeObject(actorData.token, createTokenData(actorData));
});

function createTokenData(actorData) {
  const tokenData = actorData.token ?? {};
  
  const display = actorData.type === "character"
    ? CONST.TOKEN_DISPLAY_MODES.OWNER
    : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;
  
  return {
    displayName: display,
    displayBars: display,
    bar1: { attribute: "attributes.hp" },
    bar2: { attribute: null },
  };
}

// This function can be called via macro to convert existing world actors to use the correct prototype
// token settings. This will not affect tokens already placed in scenes.
async function convertExistingActorPrototypeTokens() {
  return game.actors.updateAll(a => ({ token: createTokenData(a.data) }));
}

globalThis.convertExistingActorPrototypeTokens = convertExistingActorPrototypeTokens;
