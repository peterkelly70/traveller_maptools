[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("editAttackMods Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: attack = json.get(macro.args, 3)]

[h: weaponsJ = getProperty("Weapons", callerID)]
[h: weapon = json.get(weaponsJ, attack)]
[h: traits = json.get(weapons,7)]
[h: modifiersJ = getProperty("Modifiers", callerID)]
[h: attackMods = json.get(modifiersJ, attack)]


[h: dropdown = "-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0"]
[h: aimDD = "0,1,2,3,4,5,6"]
[h: scopeDD = "0,1"]
[h: rangeDD = "Out of Range,Extreme,Long,Effective,Short"]
[h: rangeVal = "-4,-2,0,1"]
[h: coverDD = "0,-2"]
[h: proneDD = "0,-1"]
[h: miscDD = "-5,-4,-3,-2,-1,0,1,2,3,4,5"]
[h: injuredDD = "0,-2"]

[h: aiming = json.get(attackMods,0)]
[h: aimingIdx = listFind(aimDD,aiming)]

[h: scope = if(listFind(traits,"Scope") == -1, 0, 1)]
[h: scopeIdx = listFind(scopeDD,scope)]

[h: range = json.get(attackMods,2)]
[h: rangeIdx= listFind(rangeVal,range)]

[h: targetCover = json.get(attackMods,3)]
[h: targetCoverIdx = listFind(coverDD,targetCover)]

[h: targetProne = json.get(attackMods,4)]
[h: targetProneIdx  = listFind(proneDD,targetProne)]

[h: targetMove = json.get(attackMods,5)]
[h: targetMoveIdx = listFind(dropdown,targetMove)]

[h: reactions = json.get(attackMods,6)]
[h: reactionsIdx  = listFind(dropdown,scope)]

[h: misc = json.get(attackMods,7)]
[h: miscIdx  = listFind(miscDD,misc)]

[h: injured = json.get(attackMods,8)]
[h: injuredIdx = listFind(injuredDD,injured)]




[h: status = input(
  "header|Edit Attack Modifiers||LABEL|SPAN=TRUE",
  "nuAiming|"+aimDD+"|Aiming|LIST|SELECT="+aimingIdx+" VALUE=STRING",
  "nuScope|"+scopeDD+"|Scope|LIST|SELECT="+scopeIdx+" VALUE=STRING",
  "nuRange|"+rangeDD+"|Range|LIST|SELECT="+rangeIdx+" VALUE=STRING",
  "nuCover|"+coverDD+"|Cover|LIST|SELECT="+targetCoverIdx+" VALUE=STRING",
  "nuProne|"+proneDD+"|Prone|LIST|SELECT="+targetProneIdx+" VALUE=STRING",
  "nuMoving|"+dropdown+"|Range|LIST|SELECT="+targetMoveIdx+" VALUE=STRING",
  "nuReaction|"+dropdown+"|Reactons|LIST|SELECT="+reactionsIdx+" VALUE=STRING",
  "nuMisc|"+miscDD+"|Misc|LIST|SELECT="+miscIdx+" VALUE=STRING",
  "nuInjured|"+injuredDD+"|Injured|LIST|SELECT="+injuredIdx+" VALUE=STRING"
)]
[h, if (status == 0), code:{
    [h, if (debug == 1): broadcast("Input was cancelled by the user.")]
    [r: abort(0)]
}]


[h: nuRange=listGet(rangeVal,listFind(rangeDD,nuRange))]
[h: updatedMods = json.append("[]",
  nuAiming,
  nuScope,
  nuRange,
  nuCover,
  nuProne,
  nuMoving,
  nuReaction,
  nuMisc,
  nuInjured
)]  


[h: newModifiers = json.set(modifiers, attack, updatedMods)]
[h: setProperty("Modifiers", newModifiers, callerID)]

[h, if (debug == 1): broadcast("editAttackMods Stopped")]
<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
