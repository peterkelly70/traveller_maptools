[h: debug("AttackRoll Started")]

[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabReturn = arg(2)]
[h: attackName = arg(3)]
[h: doc = "We need to add some variable to handle multiple attacks, so we can call this recursively"]
[h: doc = "targetID, at the very least, so we can construct the list of available targets"]

[h: lastAttackJ = getProperty("LastAttack", callerID)]
[h: debug("<pre>LastAttack: " + json.indent(lastAttackJ) + "</pre>")]
[h: coverMod = json.get(lastAttackJ,0)]
[h: aimingMod = json.get(lastAttackJ,1)]
[h: autoMode = json.get(lastAttackJ,2)]
[h: useScope = json.get(lastAttackJ,3)]
[h: miscMod = json.get(lastAttackJ,4)]

[h: attacksJ = getProperty("Attacks", callerID)]
[h: attackJ = json.get(attacksJ, attackName)]
[h: debug("<pre>attackJ ==> " + attackJ + "</pre>")]
[h: skill = json.get(attackJ, 0)]
[h: debug("<pre>skill ==> " + skill + "</pre>")]
[h: skillJ = getProperty("Skills", callerID)]
[h: skillVal = json.get(skillJ, skill)]
[h: debug("<pre>skillVal ==> " + skillVal + "</pre>")]
[h: stat = json.get(attackJ, 1)]
[h: debug("<pre>stat ==> " + stat + "</pre>")]

[h: weaponsJ = getProperty("Weapons", callerID)]
[h: weaponData = json.get(weaponsJ, attackName)]

[h: modifiersJ = getProperty("Modifiers", callerID)]
[h: attackMods = json.get(modifiersJ, attackName)]

[h: statCur=getStat(callerID,stat,"cur")]
[h: statDM = getStatDM(statCur)]
[h: debug("<pre>stat DM ==> " + statDM + "</pre>")]

[h: lastTarget = getProperty("Target", callerID)]

[h: dropAuto = "Single,Burst,Full"]
[h: dropTL = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"]
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: dropNegTen = "0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10"]
[h: dropNum = "-5,-4,-3,-2,-1,0,1,2,3,4,5"]
[h: dropPos = "0,1,2,3,4,5"]
[h: dropNeg = "-5,-4,-3,-2,-1,0"]
[h: damageTypes = "Kinetic,Energy,Radiation,Explosive,Stun,Corrosive,Cold,Heat"]
[h: weaponTypes = "Melee,Slug,Energy,Grenade,Heavy"]
[h: dropSmart = "None,TL11,TL13"]
[h: dropRange = "Out of Range,Extreme,Long,Effective,Short"]
[h: dropCover = "0,-2"]
[h: rangeVal = "-4,-2,0,1"]
[h: targetReactDD = "Dodge,Dive for Cover"]
[h: targetReactVal = "-1,-2"]

[h: tl = json.get(weaponData, 0)]
[h: range = json.get(weaponData, 1)]
[h: damage = json.get(weaponData, 2)]
[h: weight = json.get(weaponData, 3)]
[h: cost = json.get(weaponData, 4)]
[h: mag = json.get(weaponData, 5)]
[h: magCost = json.get(weaponData, 6)]
[h: traitsList = json.get(weaponData, 7)]

[h: args = json.append("[]", callerID, returnCall, tabReturn, traitsList, "All")]
[h, macro("getTrait@lib:Traveller"): args]
[h: traitsJson = macro.return]
[h: debug(callerID, "<pre>getTrait(all) ==> " + json.indent(traitsJson) + "</pre>")]

[h: weaponType = json.get(traitsJson, "Weapon Type")]
[h: damageType = json.get(traitsJson, "Damage Type")]
[h: debug("damageType >> "+damageType)]
[h: ap = json.get(traitsJson, "AP")]

[h: autoMod=0]
[h: autoMod = json.get(traitsJson, "Auto")]
[h: debug("<pre> Auto ==> "+autoMod+"</pre>")]
[h: debug("<pre> AutoMod ==> "+autoMod+"</pre>")]

[h: blastMod=0]
[h: blastMod = json.get(traitsJson, "Blast")]
[h: debug("<pre>Blast ==> "+blastMod+"</pre>")]
[h: debug("<pre>BlastMod ==> "+blastMod+"</pre>")]

[h: bulkyMod = 0]
[h: bulky = json.get(traitsJson, "Bulky")]
[h, if (bulky != "0"): bulkyMod = min((statDM-1),0)]
[h: veryBulky = json.get(traitsJson, "Very Bulky")]
[h, if (veryBulky != "0"): bulkyMod = min((statDM-2),0)]

[h: smartMod = 0]
[h: smart = json.get(traitsJson, "Smart Weapon")]
[h: debug("<pre>Smart ==> "+smart+"</pre>")]

[h: radiation = json.get(traitsJson, "Radiation")]
[h: scope = json.get(traitsJson, "Scope")]

[h: stun = json.get(traitsJson, "Stun")]
[h: zeroG = json.get(traitsJson, "Zero-G")]
[h: auxGrenadeLauncher = json.get(traitsJson, "Auxiliary Grenade Launcher")]
[h: gyrostabiliser = json.get(traitsJson, "Gyrostabiliser")]
[h: laserSight = json.get(traitsJson, "Laser Sight")]
[h: secureWeapon = json.get(traitsJson, "Secure Weapon")]
[h: suppressor = json.get(traitsJson, "Suppressor")]

<!-- Melee Weapons dont have ammo -->
[h, if(weaponType=="Melee"), code: {
    [h: itemCount = 1]
    [h: currentMag = 1]
    [h: itemType = "Melee"]
};{
   [h: supplyJ = getProperty("Supplies",callerID)]
   [h: itemJ = json.get(supplyJ,attackName)]
   [h: itemCount = json.get(itemJ,0)]
   [h: currentMag = json.get(itemJ,1)]
   [h: itemType = json.get(itemJ,2)]
}]

<!-- Get Target -->
[H: fullTokenList=getExposedTokens()]

[h: distancetoTokens="{}"]
[h, foreach(tokenID,fullTokenList), code: {
   [h: distancetoToken = getDistance(tokenID, 1, callerID, "NO_GRID")]
   [h: distancetoTokens = json.set(distancetoTokens,tokenID,distancetoToken)]
}]

[h: args = json.append("[]",distancetoTokens)]
[h, macro("jsonSort@lib:Traveller"): args]
[h: distancetoTokens = macro.return]
[h: debug("<pre> Distance ==> "+json.indent(distancetoTokens)+"</pre>")]

[h: imgList = ""]
[h: tokenList = ""]
[h, foreach(tokenID,distancetoTokens), code: {
   [h: tokenImage = getTokenImage(32,tokenID)]	
   [h: tokenName = getName(tokenID)]	
   [h: tokenList = listAppend(tokenList,tokenID)]
   [h: imagename = tokenName+" "+tokenImage]
   [h: imgList = listAppend(imgList,imagename)]
}]

[h: distanceList = json.fields(distancetoTokens)]
[h: lastTargetName = ""]
[h: lastTargetIDX = -1]
[h: debug("Last Target Index: " + lastTargetIDX)]
[h, if(json.contains(distancetoTokens, lastTarget)), code:{
	[h: lastTargetName = getName(lastTarget)]
	[h: lastTargetIDX = listFind(distanceList, lastTarget)]
};{
	[h: lastTargetName = ""]
	[h: lastTargetIDX = -1]
}]
[h, if (lastTargetIDX == -1): lastTargetIDX = 0]
[h: debug("Last Target Name: " + lastTargetName)]

[h:status=input(
	"titleTarget|<html><div width=400><b>Target</b></div></html>|bar|LABEL|span=true",
	"titleBar|<html><div width=400><HR></div></html>|bar|LABEL|span=true",
    "targetIDX|"+imgList+"|Select Target|LIST|SELECT="+lastTargetIDX+" ICON=TRUE ICONSIZE=42"   
)]
[h, if (status == 0), code:{
    [h: debug("Input was cancelled by the user.")]
    [r: abort(0)]
}]

[h: targetID = listGet(tokenList,targetIDX)]
[h: targetName = getName(targetID)]
[h: targetTL = getProperty("TL",targetID)]
[h, if (smart != "0"): smartMod = max(1,max((tl-targetTL),6))]
[h: targetDistance = number(json.get(distancetoTokens,targetID))]
[h: debug("<pre>Selected "+targetID+" distance: " + targetDistance + " TL: " + targetTL + "</pre>")]

<!-- Determine range band and corresponding DM -->
[h: bandShort = number(range) / 4 ]
[h: bandEffective = number(range)]
[h: bandLong = number(range) * 2]
[h: bandExtreme = number(range) * 4]
[h: debug("<pre>Bands Calculated </pre>")]

[h: rangeBand="Effective"]
[h: rangeBand=if(targetDistance <= bandExtreme,"Extreme",rangeBand)]
[h: rangeBand=if(targetDistance <= bandLong,"Long",rangeBand)]
[h: rangeBand=if(targetDistance <= bandEffective,"Effective",rangeBand)]
[h: rangeBand=if(targetDistance <= bandShort,"Short",rangeBand)]
[h: debug("<pre>Range Band: " + rangeBand + "</pre>")]

[h, switch(rangeBand), code:
    case "Short": {
    	[rangeMod=1]
    };
    case "Effective": {
    	[rangeMod=0]
    };
    case "Long": {
    	[rangeMod=-2]
    };
    case "Extreme": {
    	[rangeMod=-4]
    };
    default:{
    	[rangeMod=-100]
    }]

<!-- Extract the modifier values for input dialog and ensure they are numbers -->
[h: debug("<pre>200 - Modifiers: " + json.indent(attackMods) + "</pre>")]
[h: supriseMod = json.get(attackMods,2)]
[h: awarenessMod = json.get(attackMods,3)]
[h: environmentMod = json.get(attackMods,4)]
[h: equipmentMod = json.get(attackMods,5)]
[h: encumbranceMod = json.get(attackMods,6)]
[h: fatigueMod = json.get(attackMods,7)]
[h: injuredMod = json.get(attackMods,8)]

<!-- Calculate indices for dropdown values -->
[h: debug("<pre>210 - Calculate indices for dropdown values</pre>")]
[h: rangeIDX = number(listFind(dropRange,rangeBand))]
[h: coverIDX = number(listFind(dropCover,coverMod))]
[h: aimingIDX = number(listFind(dropTen,aimingMod))]
[h: supriseIDX = number(listFind(dropNum,supriseMod))]
[h: awarenessIDX = number(listFind(dropNum,awarenessMod))]
[h: autoIDX = 0)]
[h: environmentIDX = number(listFind(dropNum,environmentMod))]
[h: equipmentIDX = number(listFind(dropNum,equipmentMod))]
[h: encumbranceIDX = number(listFind(dropNegTen,encumbranceMod))]
[h: miscIDX = listFind(dropNum,"0")]
[h: fatigueIDX = number(listFind(dropNegTen,fatigueMod))]
[h: injuredIDX = number(listFind(dropNegTen,injuredMod))]

<!-- Debug section -->
[h: debug("<pre>Range: "+ rangeBand + "("+rangeIDX+")</pre>")]
[h: debug("<pre>cover: "+ coverMod + "("+coverIDX+")</pre>")]
[h: debug("<pre>suprise: "+ supriseMod + "("+supriseIDX+")</pre>")]
[h: debug("<pre>awareness: "+ awarenessMod + "("+awarenessIDX+")</pre>")]
[h: debug("<pre>auto: "+ autoMode + "("+autoIDX+")</pre>")]
[h: debug("<pre>aiming: "+ aimingMod + "("+aimingIDX+")</pre>")]
[h: debug("<pre>environment: "+ environmentMod + "("+environmentIDX+")</pre>")]
[h: debug("<pre>encumbrance: "+ encumbranceMod + "("+encumbranceIDX+")</pre>")]
[h: debug("<pre>equipment: "+ equipmentMod + "("+equipmentIDX+")</pre>")]
[h: debug("<pre>eMisc: "+ miscMod + "("+miscIDX+")</pre>")]
[h: debug("<pre>fatigue: "+ fatigueMod + "("+fatigueIDX+")</pre>")]
[h: debug("<pre>injured: "+ injuredMod + "("+injuredIDX+")</pre>")]
[h: debug("<pre>245 - Indices Calculated</pre>")]

<!-- Defaults -->
[h: mode = 0]
[h: scope = 0]

<!-- Build the input dialog string -->
[h: inputStr = json.append("[]","dummy")]
[h: inputStr = json.remove(inputStr,0)]
[h: inputStr = json.append(inputStr, strformat("title|<html><div width=400><b>Attack Mods</b></div></html>|bar|LABEL|span=true"))]
[h: inputStr = json.append(inputStr, strformat("bar|<html><div width=400><HR></div></html>|bar|LABEL|span=true"))]
[h: inputStr = json.append(inputStr, strformat("rangeTarget|%s|Range|LIST|SELECT=%d",dropRange,rangeIDX))]
[h: inputStr = json.append(inputStr, strformat("cover|%s|Target Cover|LIST|SELECT=%d",dropCover,coverIDX))]
[h: inputStr = json.append(inputStr, strformat("aiming|%s|Aiming|LIST|SELECT=%d",dropTen,aimingIDX))]
[h, if (autoMod != "0"): inputStr = json.append(inputStr, strformat("mode|%s|Auto Fire Mode|LIST|SELECT=%d",dropAuto,amode))]
[h, if (scope == 1): inputStr = json.append(inputStr, strformat("scope|%d|Use Scope|CHECK",useScope))]
[h: inputStr = json.append(inputStr, strformat("dodge|%s|Target Dodge|LIST|SELECT=%d",dropNeg,5))]
[h: inputStr = json.append(inputStr, strformat("dive|%d|Target Dives for Cover|CHECK",0))]
[h: inputStr = json.append(inputStr, strformat("parry|%s|Target Parries|LIST|SELECT=%d",dropNeg,5))]
[h: inputStr = json.append(inputStr, strformat("misc|%s|Misc Mods|LIST|SELECT=%d",dropNum,miscIDX))]

[h: inputStr = json.append(inputStr, strformat("suprise|%s|Surprise Modifier|LIST|SELECT=%d",dropNum,supriseIDX))]
[h: inputStr = json.append(inputStr, strformat("awareness|%s|Awareness Modifier|LIST|SELECT=%d",dropNum,awarenessIDX))]
[h: inputStr = json.append(inputStr, strformat("environment|%s|Environment Modifier|LIST|SELECT=%d",dropNum,environmentIDX))]
[h: inputStr = json.append(inputStr, strformat("equipmentS|%s|Equipment Modifier|LIST|SELECT=%d",dropNum,equipmentIDX))]
[h: inputStr = json.append(inputStr, strformat("encumbrance|%s|Encumbrance Modifier|LIST|SELECT=%d",dropNegTen, encumbranceIDX))]
[h: inputStr = json.append(inputStr, strformat("fatigue|%s|Fatigue Modifier|LIST|SELECT=%d",dropNegTen,fatigueIDX))]
[h: inputStr = json.append(inputStr, strformat("injured|%s|Injury Modifier|LIST|SELECT=%d",dropNegTen,injuredIDX))]
[h: debug("Input created.")]

<!-- Show the input dialog -->
[h: status = input(json.toList(json.evaluate(inputStr), "##"))]
[h, if (status == 0), code:{
    [h: debug("Input was cancelled by the user.")]
    [r: abort(0)]
}]

[h: debug("<pre>rangeTarget: " + rangeTarget + "</pre>")]
[h: rangeSwitch=listGet(dropRange,rangeTarget)]
[h: debug("<pre>RangeSwitch: " + rangeSwitch + "</pre>")]

[h, switch(rangeSwitch), code:
    case "Short": {
    	[h:rangeMod=1]
    };
    case "Effective": {
    	[h:rangeMod=0]
    };
    case "Long": {
    	[h:rangeMod=-2]
    };
    case "Extreme": {
    	[h:rangeMod=-4]
    };
    default:{
    	[h:rangeMod=-100]
    }]
[h: debug("<pre>RangeMod: " + rangeMod + "</pre>")]

[h: debug("<pre>AutoMode: " + mode + "</pre>")]
[h, if(weaponType=="Melee"), code: {
    [h: modeSwitch="Melee"]  
};{
   [h: modeSwitch=listGet(dropAuto,mode)]
}]
[h: debug("<pre>modeSwitch: " + modeSwitch + "</pre>")]

[h, switch(modeSwitch), code:
    case "Melee": {
       [h: autoMod=0]
       [h:ammoUsed=0]
       [h:extraDamage=0]
    };
    case "Single": {
    	[h: autoMod=0]
    	[h:ammoUsed=1]
    	[h:extraDamage=0]
    };
    case "Burst": {
    	[h:ammoUsed=autoMod]
    	[h:extraDamage=autoMod]
    };
    case "Full": {
    	[h: autoMod=0]
    	[h:ammoUsed=autoMod]
    	[h:extraDamage=autoMod]
    };
    default:{
    	[h:ammoUsed=autoMod*3]
    	[h:rangeMod=-100]
    	[h:extraDamage=0]
    }]

[h: debug("<pre>AutoMod: " + autoMod + "</pre>")]
[h: debug("<pre>extraDamage: " + extraDamage + "</pre>")]


[h, if (weaponType == "Melee"), code: {
    [h: debug("Melee Attack")]
};{   
    [h, if(currentMag < ammoUsed) , code: {
      [h: debug("Not Enough Ammo")]
      [h: abort(0)]
    };{   	
      [h: currentMag = number(currentMag) - number(ammoUsed)]
      [h: debug("Shots Left "+currentMag+"/"+mag)]
      [h: nuItem = json.append("[]",itemCount,currentMag,itemType)]
      [h: supplyJ = json.set(supplyJ,attackName,nuItem)]
      [h: setProperty("Supplies",supplyJ,callerID)]
   }]
}]

<!-- Update the modifiers based on the input -->
[h: dodgeMod=listGet(dropNeg,dodge)]
[h: parryMod=listGet(dropNeg,parry)]
[h: diveMod=0]
[h, if(dive==1): diveMod = -2]
[h: debug("<pre>316 -Update Started</pre>")]
[h: supriseMod = listGet(dropNum,suprise)]
[h: debug("<pre>suprise: " + suprise + "</pre")]
[h: awarenessMod = listGet(dropNum,awareness)]
[h: environmentMod = listGet(dropNum,environment)]
[h: equipmentMod = listGet(dropNum,equipmentS)]
[h: encumbranceMod = listGet(dropNegTen,encumbrance)]
[h: fatigueMod = listGet(dropNegTen,fatigue)]
[h: injuredMod = listGet(dropNegTen,injured)]
[h: debug("<pre>supriseMod: " + supriseMod + "</pre")]
[h: debug("<pre>awarenessMod: " + awarenessMod + "</pre")]
[h: debug("<pre>environmentMod: " + environmentMod + "</pre")]
[h: debug("<pre>equipmentMod: " + equipmentMod + "</pre")]
[h: debug("<pre>encumbranceMod: " + encumbranceMod + "</pre")]
[h: debug("<pre>fatigueMod: " + fatigueMod + "</pre")]
[h: debug("<pre>injuredMod: " + injuredMod + "</pre")]
[h: debug("<pre>Updated Some Modifiers</pre>")]

[h:skillVal=number(skillVal)] 
[h:statDM=number(statDM)]
[h:rangeMod=number(rangeMod)]
[h:coverMod=number(listGet(dropCover,cover))]
[h:aimingMod=number(listGet(dropTen,aiming))]
[h:autoMod=number(autoMod)]
[h:bulkyMod=number(bulkyMod)]
[h:smartMod=number(smartMod)]
[h:miscMod=number(listGet(dropNum,misc))]

[h: debug("<pre>SkillVal: " + skillVal + "</pre")]
[h: debug("<pre>StatDM: " + statDM + "</pre")]
[h: debug("<pre>rangeMod: " + rangeMod + "</pre")]
[h: debug("<pre>coverMod: " + coverMod + "</pre")]
[h: debug("<pre>aimingMod: " + aimingMod + "</pre")]
[h: debug("<pre>autoMod: " + autoMod + "</pre")]
[h: debug("<pre>bulkyMod: " + bulkyMod + "</pre")]
[h: debug("<pre>smartMod: " + smartMod + "</pre")]
[h: debug("<pre>miscMod: " + miscMod + "</pre")]
[h: debug("<pre>Update Final</pre>")]

[h: nuLastAttackJ = json.append('[]',cover,aiming,autoMode,useScope,miscMod)]

<!-- Update the attackMods JSON object -->
[h: nuAttackMods = json.append('[]',skillVal,statDM,supriseMod,awarenessMod,environmentMod,equipmentMod,encumbranceMod, fatigueMod,injuredMod)]

<!-- Save the updated modifiers back to the property -->
[h: modifiersJ = json.set(modifiersJ, attackName, nuAttackMods)]
[h: setProperty("Modifiers", modifiersJ, callerID)]
[h: reactionsMod = 0]
<!-- Calculate the totalModifier based on updated values -->
[h: totalModifier = reactionsMod + supriseMod + awarenessMod + environmentMod + equipmentMod + encumbranceMod + fatigueMod + injuredMod]

<!-- Continue with the rest of your script, applying the totalModifier in the final calculation -->
[h: totalMod = skillVal+statDM+rangeMod+coverMod+aimingMod+autoMod+bulkyMod+smartMod+dodgeMod+diveMod+parryMod+miscMod+totalModifier]

[h: debug("Total Mod >> " + totalMod)]

[h: roll = 2d6]
[h: attackRoll = roll + totalMod]
[h: debug("attackRoll >> " + attackRoll)]
[h: tooltipText = "<html>Roll : " + roll+ "<br>"]
[h: tooltipText = tooltipText + "<br>Skill  : " + skillVal]
[h: tooltipText = tooltipText + "<br>Stat   : " + statDM]
[h: tooltipText = tooltipText + "<br>Range  : " + rangeMod]
[h: tooltipText = tooltipText + "<br>Cover  : " + coverMod]
[h: tooltipText = tooltipText + "<br>Dodge  : " + dodgeMod]
[h: tooltipText = tooltipText + "<br>Dive   : " + diveMod]
[h: tooltipText = tooltipText + "<br>Parry  : " + parryMod]
[h: tooltipText = tooltipText + "<br>Aiming : " + aimingMod]
[h: tooltipText = tooltipText + "<br>Auto   : " + autoMod]
[h: tooltipText = tooltipText + "<br>Bulky  : " + bulkyMod]
[h: tooltipText = tooltipText + "<br>Smart  : " + smartMod]
[h: tooltipText = tooltipText + "<br>Misc   : " + miscMod]
[h: tooltipText = tooltipText + "<br>Other Modifiers"]
[h: tooltipText = tooltipText + "<br>   Reactions  :"+reactionsMod)]
[h: tooltipText = tooltipText + "<br>   Suprise    :"+supriseMod)]
[h: tooltipText = tooltipText + "<br>   Awareness  :"+awarenessMod]
[h: tooltipText = tooltipText + "<br>   Environment:"+environmentMod]
[h: tooltipText = tooltipText + "<br>   Equipment  :"+equipmentMod]
[h: tooltipText = tooltipText + "<br>   Encumbrance:"+encumbranceMod]
[h: tooltipText = tooltipText + "<br>   Fatigue    :"+fatigueMod]
[h: tooltipText = tooltipText + "<br>   Injured    :"+injuredMod]
[h: debug("Tooltips >> " + tooltipText)]

[h: effect = attackRoll - 8]
[h: debug("effect >> " + effect)]
[h, if (attackRoll > 7), code: {
    [h: damageRoll = eval(damage)]
    [h: totalDamage = damageRoll + extraDamage]
    [h: tooltipDam = "<html>Roll : " + damageRoll]
    [h: tooltipDam = tooltipDam + "<br>Extra  : " + extraDamage]
    [h: tooltipDam = tooltipDam + "<br>Type  : " + damageType]
    [h: resultMsg = ""]
    [h: resultMsg = "<b>Attack Roll for " + attackName + "</b><br>"]
    [h: resultMsg = resultMsg + "<u><span title='" + tooltipText + "'><b>Roll :" + attackRoll + " (Effect: " + effect + ")</span></b></u><br>"]
    [h: resultMsg = resultMsg + "Target: " + targetName + "<br>"]
    [h: resultMsg = resultMsg + "Total Modifier: " + totalMod + "<br>"]
    [h: resultMsg = resultMsg +  "<u><span title='" + tooltipDam + "'><b>Damage :" + totalDamage + "</span></b></u><br>"]
    [h: debug("damageType >> " + damageType)]
    [h: args = json.append("[]", callerID, returnCall, "Apply Damage", "applyDamage@lib:Traveller", json.append("[]", tabReturn, targetID, damageRoll, damageType), "applyDamage", 64)]
    [h, macro("makeLink@Lib:Traveller"): args]
    [h: macroLink = macro.return]
    [h: resultMsg = resultMsg + macroLink]
    [h: debug("<pre>Working on resultMsg</pre>")]
    };{
    [h: resultMsg = "<b>" + attackName + " Missed</b>"]
    [h: resultMsg = resultMsg + "<span title='" + tooltipText + "'<br>Roll : " + attackRoll + " (Effect: " + effect + ")</span>"]
}]

[h: debug(resultMsg)]

[h: resultMsg = if(ap > 0, resultMsg + "<br>AP: " + ap, resultMsg)]
[h: resultMsg = if(blastMod > 0, resultMsg + "<br>Blast: " + blastMod + "m", resultMsg)]
[h: resultMsg = if(radiation == 1, resultMsg + "<br>Radiation: " + (2 * eval(damage)) + " rads in " + damage + "m", resultMsg)]
[h: resultMsg = if(stun == 1, resultMsg + "<br>Stun damage", resultMsg)]
[h: resultMsg = if(zeroG == 1, resultMsg + "<br>Zero-G capable", resultMsg)]

[h: resultMsg = resultMsg + "<br>Ammo used: " + ammoUsed + "<br>Remaining: " + currentMag + "/" + mag]

[h: debug("resultMsg->"+resultMsg)]
[r: say(callerID, resultMsg)]

[h: debug("AttackRoll Finished")]
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
