[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]

[h: modifiers = getProperty("Modifiers", callerID)]
[h: initiativeMods = json.get(modifiers, "InitiativeModifiers")]

[h: dexMod = json.get(initiativeMods, 0)]
[h: surpriseMod = json.get(initiativeMods, 1)]
[h: awarenessMod = json.get(initiativeMods, 2)]
[h: environmentMod = json.get(initiativeMods, 3)]
[h: equipmentMod = json.get(initiativeMods, 4)]
[h: encumbranceMod = json.get(initiativeMods, 5)]
[h: fatigueMod = json.get(initiativeMods, 6)]
[h: miscMods = json.get(initiativeMods, 7)]

[h: dropdownOptions = json.append("[]", "-4", "-3", "-2", "-1", "0", "1", "2", "3", "4")]

[h: input(
  "dexMod|" + dexMod + "|Dexterity Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + dexMod,
  "surpriseMod|" + surpriseMod + "|Surprise Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + surpriseMod,
  "awarenessMod|" + awarenessMod + "|Situational Awareness Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + awarenessMod,
  "environmentMod|" + environmentMod + "|Environmental Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + environmentMod,
  "equipmentMod|" + equipmentMod + "|Equipment Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + equipmentMod,
  "encumbranceMod|" + encumbranceMod + "|Encumbrance Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + encumbranceMod,
  "fatigueMod|" + fatigueMod + "|Fatigue Modifier|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + fatigueMod,
  "miscMods|" + miscMods + "|Miscellaneous Modifiers|LIST|" + json.toStr(dropdownOptions) + "|SELECT=" + miscMods
)]

[h, if(input), code: {
  [h: updatedMods = json.set(initiativeMods,
    0, dexMod,
    1, surpriseMod,
    2, awarenessMod,
    3, environmentMod,
    4, equipmentMod,
    5, encumbranceMod,
    6, fatigueMod,
    7, miscMods
  )]

  [h: newModifiers = json.set(modifiers, "InitiativeModifiers", updatedMods)]
  [h: setProperty("Modifiers", newModifiers, callerID)]
}]

// Refresh the calling page
[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]
