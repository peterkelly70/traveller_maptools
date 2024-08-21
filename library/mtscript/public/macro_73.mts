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

[h: dropdownOptions = "-4,-3,-2,-1,0,1,2,3,4"]

[h: dropdownOptions = ""]

<!-- Append multiple values at once -->
[h, foreach(value, "-4,-3,-2,-1,0,1,2,3,4"): dropdownOptions = listAppend(dropdownOptions, value)]

[h: status = input(
  "header|Edit Initiative Modifiers||LABEL|SPAN=TRUE",
  "surpriseMod|" + dropdownOptions + "|Surprise Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(surpriseMod)) + " VALUE=STRING",
  "awarenessMod|" + dropdownOptions + "|Situational Awareness Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(awarenessMod)) + " VALUE=STRING",
  "environmentMod|" + dropdownOptions + "|Environmental Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(environmentMod)) + " VALUE=STRING",
  "equipmentMod|" + dropdownOptions + "|Equipment Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(equipmentMod)) + " VALUE=STRING",
  "encumbranceMod|" + dropdownOptions + "|Encumbrance Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(encumbranceMod)) + " VALUE=STRING",
  "fatigueMod|" + dropdownOptions + "|Fatigue Modifier|LIST|SELECT=" + listFind(dropdownOptions, number(fatigueMod)) + " VALUE=STRING",
  "miscMods|" + dropdownOptions + "|Miscellaneous Modifiers|LIST|SELECT=" + listFind(dropdownOptions, number(miscMods)) + " VALUE=STRING",
  "recoilMods|" + dropdownOptions + "|Recoil Modifiers|LIST|SELECT=" + listFind(dropdownOptions, number(recoilMods)) + " VALUE=STRING",
  "reactionMods|" + dropdownOptions + "|Reaction Modifiers|LIST|SELECT=" + listFind(dropdownOptions, number(reactionMods)) + " VALUE=STRING"
)]


[h, if(status), code: {
  [h: curInit = baseInit + recoilMods + reactionMods + miscMods + awarenessMod + environmentMod + equipmentMod + encumbranceMod + fatigueMod]
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

<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]
