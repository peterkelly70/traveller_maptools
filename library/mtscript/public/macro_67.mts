[h: debug = getLibProperty("debug","lib:Traveller")]

[h, if (debug == 1): broadcast("<pre> Start rollInitiative </pre>")]

[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]

[h: modifiersJ = getProperty("Modifiers", callerID)]
[h: initiativeModsJ = json.get(modifiersJ, "InitiativeModifiers")]
[h: broadcast("<pre>" + json.indent(initiativeModsJ) + "</pre>")]
[h: baseInit = json.get(initiativeModsJ, 0)]
[h: curInit = json.get(initiativeModsJ, 1)]
[h: dexMod = json.get(initiativeModsJ, 2)]
[h: surpriseMod = json.get(initiativeModsJ, 3)]
[h: awarenessMod = json.get(initiativeModsJ, 4)]
[h: environmentMod = json.get(initiativeModsJ, 5)]
[h: equipmentMod = json.get(initiativeModsJ, 6)]
[h: encumbranceMod = json.get(initiativeModsJ, 7)]
[h: fatigueMod = json.get(initiativeModsJ, 8)]
[h: miscMods = json.get(initiativeModsJ, 9)]
[h: recoilMods = json.get(initiativeModsJ, 10)]
[h: reactionMods = json.get(initiativeModsJ, 11)]


[h: roll = 2d6 ]
[h: rollResult = roll + dexMod + surpriseMod + awarenessMod + environmentMod + equipmentMod + encumbranceMod + fatigueMod + miscMods+reactionMods+recoilMods]

[h: tooltipText = "<html>Roll: " + roll + 
"<br>Dex         : " + dexMod + "<br>Suprised    : " + surpriseMod + 
"<br>Awareness   : " +awarenessMod + 
"<br>Environmen  : " + environmentMod + 
"<br>Equioment   : " +  equipmentMod + 
"<br>Encumberance: " +  encumbranceMod + 
"<br>Fatigued    : " +  fatigueMod + 
"<br>Misc    : " +  miscMods + 
"<br>Heft/Recoil : " +  recoilMods + 
"<br>Reactions   : " +  reactionMods + 
"</html>"]

[h: result = "<span title='" + tooltipText + "'>Initiative : " + rollResult + "</span>"]
[h:baseInit = rollResult]
[h:curInit = baseInit]
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

[h: args = json.append("[]",callerID,result)]
[macro("say@lib:Traveller"):args]

[h, if (debug == 1): broadcast("<pre> End rollInitiative </pre>")]
<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
