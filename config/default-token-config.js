/**
 * @author cole#9640
 * This script will change the default token configuration. It changes the following:
 *  - If the actor is a PC, show the name for all players. Otherwise, show it to the token's owner when hovered.
 *  - Always show all resource bars for owners of the token.
 *  - Set the first bar to display the token's hit points (dnd5e).
 *  - Set the second bar to display nothing.
 */

// This hook sets the default token configuration for new actors that are created
Hooks.on("preCreateActor", (actorData, options, userId) => {
    mergeObject(actorData.token, createDefaultTokenData(actorData.type));
});

// This function is what defines the token configuration we would like to be the default
function createDefaultTokenData(type) {
    const displayName = type === "character" ? CONST.TOKEN_DISPLAY_MODES.ALWAYS : CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;

    return {
        displayName,
        displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER,
        bar1: { attribute: "attributes.hp" },
        bar2: { attribute: null },
    };
}

// This function can be called via macro to convert existing world actors to use the correct prototype
// token settings. This will not affect tokens already placed in scenes.
async function convertExistingActorPrototypeTokens() {
    return game.actors.updateAll((a) => ({ token: createDefaultTokenData(a.data.type) }));
}

globalThis.convertExistingActorPrototypeTokens = convertExistingActorPrototypeTokens;
