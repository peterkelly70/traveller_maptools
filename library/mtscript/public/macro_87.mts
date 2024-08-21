<!-- Start of new Round -->
[h: debug = getLibProperty("debug", "lib:Traveller")]
[h, if(debug == 1): broadcast("onNewRound Started")]

[h: newRound = arg(0)]
[h, if(debug == 1): broadcast(<pre>New Round: +json.indent(newRound)+</pre>)]

<!-- Step 1: Get all active tokens in the initiative list -->
[h: tokenList = getInitiativeList()]
[h, if(debug == 1): broadcast(<pre>Token List: +json.indent(tokenList)+</pre>)]

<!-- Step 2: Reset everyones initiative back to base, apply recoil -->
[h, foreach(tokenID, tokenList), code: {
    [h: modifiers = getProperty(Modifiers, tokenID)]
    [h: initiativeMods = json.get(modifiers, InitiativeModifiers)]

    <!-- Reset initiative to base value -->
    [h: baseInit = json.get(initiativeMods, 0)]
    [h: curInit = baseInit]

    <!-- Apply recoil or other modifiers if applicable -->
    [h: recoilMods = json.get(initiativeMods, 10)]
    [h: curInit = curInit + recoilMods]

    <!-- Update the current initiative -->
    [h: initiativeMods = json.set(initiativeMods, 1, curInit)]
    [h: modifiers = json.set(modifiers, InitiativeModifiers, initiativeMods)]
    [h: setProperty(Modifiers, modifiers, tokenID)]

    <!-- Update initiative in the initiative list -->
    [h: addToInitiative(0, curInit, tokenID)]
    [h, if(debug == 1): broadcast(Token +tokenID+ Initiative reset to +curInit)]
}]

<!-- Step 3: Apply effects (including global environmental effects) -->
[h: globalEffects = getLibProperty(globalEffects, lib:Traveller)]

[h, foreach(tokenID, tokenList), code: {
    [h: args = json.append("[]", tokenID, globalEffects)]
    [h: macro(applyEffects@lib:Traveller): args]
    [h, if(debug == 1): broadcast(Applied effects to +tokenID)]
}]

<!-- Broadcast the end of the new round setup -->
[h, if(debug == 1): broadcast(onNewRound Completed)]

<!-- Refresh the initiative order -->
[h: sortInitiative()]
