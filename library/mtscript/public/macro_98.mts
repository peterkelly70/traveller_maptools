[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("delayInitiative Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]

[h: modifiers = getProperty("Modifiers", callerID)]
[h: initiativeMods = json.get(modifiers, "InitiativeModifiers")]

[h: baseInit = json.get(initiativeMods, 0)]
[h: curInit = json.get(initiativeMods, 1)]
[h: dexMod = json.get(initiativeMods, 2)]
[h: surpriseMod = json.get(initiativeMods, 3)]
[h: awarenessMod = json.get(initiativeMods, 4)]
[h: environmentMod = json.get(initiativeMods, 5)]
[h: equipmentMod = json.get(initiativeMods, 6)]
[h: encumbranceMod = json.get(initiativeMods, 7)]
[h: fatigueMod = json.get(initiativeMods, 8)]
[h: miscMods = json.get(initiativeMods, 9)]
[h: recoilMods = json.get(initiativeMods, 10)]
[h: reactionMods = json.get(initiativeMods, 11)]

<!-- Generate the dropdown options dynamically -->
[h: dropdownOptions = ""]
[h, for(i,curInit,-10,-1): dropdownOptions = listAppend(dropdownOptions, i)]

<!-- Append multiple values at once -->
[h: status = input(
  "header|Delay Initiative||LABEL|SPAN=TRUE",
  "delay|" + dropdownOptions + "|Delay Until|LIST|SELECT=" + listFind(dropdownOptions, curInit) + " VALUE=STRING"
)]


[h, if(status), code: {
  [h: curInit = delay]
  [h: addToInitiative(0,curInit,callerID)]
  [h: sortInitiative()]
  [h: updatedMods = json.append("[]",
    baseInit,
    curInit,
    dexMod,
    surpriseMod,
    awarenessMod,
    environmentMod,
    equipmentMod,
    encumbranceMod,
    fatigueMod,
    miscMods,
    recoilMods,
    reactionMods
  )]

  [h: newModifiers = json.set(modifiers, "InitiativeModifiers", updatedMods)]
  [h: setProperty("Modifiers", newModifiers, callerID)]
}]
[h: resultMsg = "Initiative dealyed ("+curInit+")"]
[h, if (debug == 1): broadcast(resultMsg)]
[h: macroArgs = json.append("[]", callerID, resultMsg)]
[h, macro("say@lib:Traveller"):macroArgs]
[h, if (debug == 1): broadcast("delayInitiative Stopped")]
<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
