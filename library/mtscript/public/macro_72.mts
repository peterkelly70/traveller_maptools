[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("setInitiative Started")]
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

[h: dropdownOptions = "-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20"]


[h: status = input(
  "header|Set Initiative Modifiers||LABEL|SPAN=TRUE",
  "baseInit|" + dropdownOptions + "|Base Initiative|LIST|SELECT=" + listFind(dropdownOptions, number(baseInit)) + " VALUE=STRING",
  "curInit|" + dropdownOptions + "|Current Initiative|LIST|SELECT=" + listFind(dropdownOptions, number(curInit)) + " VALUE=STRING"
)]



[h, if(status), code: {
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
  [h: resultMsg = "Initiative ("+baseInit+"/"+curInit+")"]
  [h, if (debug == 1): broadcast(resultMsg)]
  [h: macroArgs = json.append("[]", callerID, resultMsg)]
  [macro("say@lib:Traveller"):macroArgs]
}]

[h, if (debug == 1): broadcast("setInitiative Stopped")]
<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
