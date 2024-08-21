[h: debug = getLibProperty("debug","lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "CharSheet"]

[h: jsonName = "Combat"]
[h: baseJson = "combatList"]
[h: tabReturn = "Combat"]
[h: filter = "false"]
[h: htmlContent = ""]

[h: attacksJ = getProperty("Attacks", callerID)]
[h: modifiersJ = getProperty("Modifiers", callerID)]

[h: initiativeModsJ = json.get(modifiersJ, "InitiativeModifiers")]
[h: baseInit = string(json.get(initiativeModsJ, 0))]
[h: curInit = string(json.get(initiativeModsJ, 1))]
[h: dexMod = string(json.get(initiativeModsJ, 2))]
[h: surpriseMod = string(json.get(initiativeModsJ, 3))]
[h: awarenessMod = string(json.get(initiativeModsJ, 4))]
[h: environmentMod = string(json.get(initiativeModsJ, 5))]
[h: encumbranceMod = string(json.get(initiativeModsJ, 6))]
[h: fatiguedMod = string(json.get(initiativeModsJ, 8))]
[h: miscMods = string(json.get(initiativeModsJ, 9))]
[h: recoilMods = string(json.get(initiativeModsJ, 10))]
[h: reactionMods = string(json.get(initiativeModsJ, 11))]

[h: reactions = json.get(getProperty("Combat", callerID), "Reactions")]

[h: addLink = "dummy"]

[h: htmlContent = htmlContent + "<div class=heading><h3>Combat</h3></div>"]

<!-- Initiative -->
[h: row_class = "white"]
[h: args = json.append("[]", callerID, returnCall, "Roll Initiative", "rollInitiative@lib:Traveller", json.append("[]", tabReturn), "roll", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: rollInitLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Delay Initiative", "delayInitiative@lib:Traveller", json.append("[]", tabReturn), "delay", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: delayInitLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Set Initiative", "setInitiative@lib:Traveller", json.append("[]", tabReturn), "add", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: setInitLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Modifiers", "editInitiative@lib:Traveller", json.append("[]", tabReturn), "edit", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: editInitLink = macro.return]

[h: crudlinks = editInitLink + setInitLink + delayInitLink + rollInitLink]

[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Initiative</h3></div><table class='scrollable'>"]
[h: "<~--Initiative -->"]
[h: htmlContent = htmlContent + "<tr style='width: 100%;' class='black'><td>Initiative</td><td>" + baseInit + "/" + curInit + "</td><td style='width: 100%; text-align: right;'>" + crudlinks + "<td></tr>"]
[h: htmlContent = htmlContent + "</table></div>"]

<!-- Combat Actions -->
[h: row_class = "white"]

[h: args = json.append("[]", callerID, returnCall, "Dodge", "dodgeReaction@lib:Traveller", json.append("[]", tabReturn), "dodge", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: dodgeLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Dive for Cover", "diveForCoverReaction@lib:Traveller", json.append("[]", tabReturn), "dive", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: diveLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Parry", "parryReaction@lib:Traveller", json.append("[]", tabReturn), "parry", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: parryLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Take Cover", "takeCoverReaction@lib:Traveller", json.append("[]", tabReturn), "cover", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: coverLink = macro.return]

[h: combatActionsLinks = dodgeLink + diveLink + parryLink + coverLink]

[h: htmlContent = htmlContent + "<div class='section'><div class='heading'><h3>Combat Reactions</h3></div><table class='scrollable'>"]
[h: htmlContent = htmlContent + "<tr style='width: 100%;' class='black'><td style='width: 100%; text-align: right;'>Reactions:" + reactions + "</td><td>" + combatActionsLinks + "<td></tr>"]
[h: htmlContent = htmlContent + "</table></div>"]

<!-- Attacks -->
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Attacks</h3></div><table class='scrollable'>"]

[h, foreach(attackType, attacksJ), code: {
  [h: attackInfo = json.get(attacksJ, attackType)]
  [h: skill = json.get(attackInfo, 0)]
  [h: stat = json.get(attackInfo, 1)]
  [h: attackMods = json.get(modifiersJ, attackType)]
  [h: doc = "Type{Weapon,skill,stat,target}"]
  [h: doc = "AttackModifiers{skillMod,statMod,surpriseMod,awarenessMod,environmentMod,equipmentMod,encumbranceMod,fatigueMod}"]

[h: args = json.append("[]", callerID, returnCall, "Reload", "reloadWeapon@lib:Traveller", json.append("[]", tabReturn, attackType), "reload", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: reloadLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Edit Modifiers", "editAttackMods@lib:Traveller", json.append("[]", tabReturn, attackType), "view", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: editAttackMods = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Edit Attack", "editAttack@lib:Traveller", json.append("[]", tabReturn, attackType), "edit", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: editAttackLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Roll Attack", "rollAttack@lib:Traveller", json.append("[]", tabReturn, attackType), "roll", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: rollAttackLink = macro.return]

[h: args = json.append("[]", callerID, returnCall, "Delete", "jsonDel@Lib:Traveller", json.append("[]", tabReturn, attackType, "Attacks"), "delete", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: delLink = macro.return]

[h: crudlinks = reloadLink + editAttackMods + editAttackLink + delLink + rollAttackLink]

[h: weaponJ = getProperty("Weapons", callerID)]
[h, if (debug == 1): broadcast("<pre>Weapons >>> " + json.indent(weaponJ) + "</pre>")]
[h: weaponData = json.get(weaponJ, attackType)]
[h, if (debug == 1): broadcast("<pre>Weapon >>> " + json.indent(weaponData) + "</pre>")]
[h: magCapacity = json.get(weaponData, 5)]
[h: traitsList = json.get(weaponData, 7)]
[h, if (debug == 1): broadcast("<pre>MagCapacity >>> " + magCapacity + "</pre>")]

[h: args = json.append("[]", callerID, returnCall, tabReturn, traitsList, "All")]
[h, macro("getTrait@lib:Traveller"): args]
[h: traitsJson = macro.return]

[h: weaponType = json.get(traitsJson, "Weapon Type")]
[h: damageType = json.get(traitsJson, "Damage Type")]
[h: ap = json.get(traitsJson, "AP")]
[h: auto = json.get(traitsJson, "Auto")]
[h: blast = json.get(traitsJson, "Blast")]
[h: bulky = json.get(traitsJson, "Bulky")]
[h: radiation = json.get(traitsJson, "Radiation")]
[h: scope = json.get(traitsJson, "Scope")]
[h: smart = json.get(traitsJson, "Smart Weapon")]
[h: stun = json.get(traitsJson, "Stun")]
[h: veryBulky = json.get(traitsJson, "Very Bulky")]
[h: zeroG = json.get(traitsJson, "Zero-G")]
[h: auxGrenadeLauncher = json.get(traitsJson, "Auxiliary Grenade Launcher")]
[h: gyrostabiliser = json.get(traitsJson, "Gyrostabiliser")]
[h: laserSight = json.get(traitsJson, "Laser Sight")]
[h: secureWeapon = json.get(traitsJson, "Secure Weapon")]
[h: suppressor = json.get(traitsJson, "Suppressor")]

[h, if (weaponType != "Melee"), code: {
   [h: supplyJ = getProperty("Supplies", callerID)]
   [h, if (debug == 1): broadcast("<pre>Supply >>> " + json.indent(supplyJ) + "</pre>")]
   [h: supplyData = json.get(supplyJ, attackType)]
   [h, if (debug == 1): broadcast("<pre>Item >>> " + json.indent(supplyData) + "</pre>")]
   [h: currentMag = json.get(supplyData, 1)]
   [h, if (debug == 1): broadcast("<pre>MagCapacity >>> " + currentMag + "</pre>")]
};{
	[h: currentMag = 1]
}]

[h: htmlContent = htmlContent + "<tr class='black'><td>" + attackType + "</td><td>" + currentMag + "/" + magCapacity + "</td><td>" + skill + " (" + stat + ")</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
}]

[h: "<~--Attacks -->"]
[h: args = json.append("[]", callerID, returnCall, "Add Attack", "addAttack@lib:Traveller", json.append("[]", tabReturn), "plus", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: addAttackLink = macro.return]

[h: htmlContent = htmlContent + "</table><div class='crud'>" + addAttackLink + "</div></div>"]

<!-- Damage and Healing Section -->
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Damage and Healing</h3></div><table class='scrollable'>"]

<!-- Display END, STR, DEX values and colored bars -->
[h: endJ = getProperty("Endurance", callerID)]
[h: strJ = getProperty("Strength", callerID)]
[h: dexJ = getProperty("Dexterity", callerID)]
[h, if (debug == 1): broadcast("<pre>END: "+json.indent(endJ)+"</pre>")]
[h, if (debug == 1): broadcast("<pre>STR: "+json.indent(strJ)+"</pre>")]
[h, if (debug == 1): broadcast("<pre>DEX: "+json.indent(dexJ)+"</pre>")]
<!-- Retrieve current and max values -->
[h: curEnd = number(json.get(endJ,"cur"))]
[h: curStr = number(json.get(strJ,"cur"))]
[h: curDex = number(json.get(dexJ,"cur"))]

[h: maxEnd = number(json.get(endJ,"max"))]
[h: maxStr = number(json.get(strJ,"max"))]
[h: maxDex = number(json.get(dexJ,"max"))]

<!-- Calculate percentages -->
[h: endPercentage = if(maxEnd > 0, floor((curEnd / maxEnd) * 100), 0)]
[h: strPercentage = if(maxStr > 0, floor((curStr / maxStr) * 100), 0)]
[h: dexPercentage = if(maxDex > 0, floor((curDex / maxDex) * 100), 0)]

<!-- Determine bar colors based on percentage -->
[h: endBarColor = if(endPercentage > 50, "green", if(endPercentage > 20, "yellow", "red"))]
[h: strBarColor = if(strPercentage > 50, "green", if(strPercentage > 20, "yellow", "red"))]
[h: dexBarColor = if(dexPercentage > 50, "green", if(dexPercentage > 20, "yellow", "red"))]

<!-- Generate the HTML content -->
[h: htmlContent = htmlContent + "<tr class='black'><td>END: " + curEnd + "/" + maxEnd + "</td><td><div style='background-color:" + endBarColor + "; width:" + endPercentage + "%; height:10px;'></div></td></tr>"]
[h: htmlContent = htmlContent + "<tr class='black'><td>STR: " + curStr + "/" + maxStr + "</td><td><div style='background-color:" + strBarColor + "; width:" + strPercentage + "%; height:10px;'></div></td></tr>"]
[h: htmlContent = htmlContent + "<tr class='black'><td>DEX: " + curDex + "/" + maxDex + "</td><td><div style='background-color:" + dexBarColor + "; width:" + dexPercentage + "%; height:10px;'></div></td></tr>"]


<!-- Worn Armor and Defenses -->
[h: wornArmorList = json.toList(getProperty("Defences", callerID))]  <!-- Get the list of worn armor items -->
[h: totalKineticDefense = 0]
[h: totalEnergyDefense = 0]
[h: totalRadiationDefense = 0]

[h: htmlContent = htmlContent + "<tr class='heading'><td>Armor</td><td>Kinetic</td><td>Energy</td><td>Radiation</td></tr>"]
[h, foreach(wornArmor, wornArmorList), code: {
    [h: armorData = json.get(getProperty("Armor", callerID), wornArmor)]
    [h, if (debug == 1): broadcast("<pre>Armor: "+wornArmor+"</pre>")]
    [h: KD=number(json.get(armorData, 1))]
    [h: ED=number(json.get(armorData, 2))]
    [h: RD=number(json.get(armorData, 3))]
    [h: totalKineticDefense = totalKineticDefense + KD ]
    [h, if (debug == 1): broadcast("<pre>KD: "+KD+"</pre>")]
    [h: totalEnergyDefense = totalEnergyDefense + ED]
    [h, if (debug == 1): broadcast("<pre>ED: "+ED+"</pre>")]
    [h: totalRadiationDefense = totalRadiationDefense + RD]
    [h, if (debug == 1): broadcast("<pre>RD: "+RD+"</pre>")]
    [h: htmlContent = htmlContent + "<tr class='black'><td>" + wornArmor + "</td><td>" + KD + "</td><td>" + ED + "</td><td>" + RD + "</td></tr>"]

}]

[h: htmlContent = htmlContent + "<tr class='black'><td>Total</td><td>" + totalKineticDefense + "</td><td>" + totalEnergyDefense + "</td><td>" + totalRadiationDefense + "</td></tr>"]
[h, if (debug == 1): broadcast("<pre>"+totalKineticDefense+"</pre>")]
[h, if (debug == 1): broadcast("<pre>"+totalEnergyDefense+"</pre>")]
[h, if (debug == 1): broadcast("<pre>"+totalRadiationDefense+"</pre>")]

<!-- Take Damage -->
[h, if (debug == 1): broadcast("<pre>231 - Take Damage</pre>")]
[h: args = json.append("[]", callerID, returnCall, "Take Damage", "applyDamage@lib:Traveller", json.append("[]", tabReturn), "minus", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: takeDamageLink = macro.return]

<!-- Heal -->
[h, if (debug == 1): broadcast("<pre>237 - Heal</pre>")]
[h: args = json.append("[]", callerID, returnCall, "Heal", "applyHealing@lib:Traveller", json.append("[]", tabReturn), "plus", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: healLink = macro.return]

<!-- Display the buttons -->
[h: crudLinks = takeDamageLink+healLink]
[h: htmlContent = htmlContent + "<tr class='black'><td></td><td></td><td></td><td style='text-align: right;'>" + crudLinks  + "</td></tr>"]

[h: htmlContent = htmlContent + "</table></div>"]

<!-- Status Section -->
[h: statusesJ = getProperty("Statuses", callerID)]
[h: statusArray = json.append("[]", "Dead","Injured","Bleeding","Unconscious","Incapacitated","Stunned","Panicked","Blinded","Deafened","Drugged","Poisoned","Infected","Fatigued","Hot","Cold","Suffocating","Radiated","Sickness","Hidden","Prone")]
[h, if (debug == 1): broadcast("<pre>Statuses --> "+json.indent(statusesJ)+"</pre>")]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Statuses</h3></div><table class='scrollable'>"]
[h: idxCount = 0]

[h, foreach(status, json.toList(statusArray)), code: {
  [h: statusInfo = json.get(statusesJ, status)]
  [h, if (debug == 1): broadcast(status+" --> "+statusInfo)]
  <!-- Only display statuses with non-zero values -->
  [h, if(statusInfo != 0), code: {
    [h: icon = tblImage("StatusIcons", idxCount, 32)]

    [h: args = json.append("[]", callerID, returnCall, "Edit", "editStatus@lib:Traveller", json.append("[]", tabReturn, status), "edit", 32)]
    [macro("makeLink@Lib:Traveller"): args]
    [h: editStatusLink = macro.return]

    [h: args = json.append("[]", callerID, returnCall, "Delete", "jsonDel@Lib:Traveller", json.append("[]", tabReturn, status, "Statuses"), "delete", 32)]
    [macro("makeLink@Lib:Traveller"): args]
    [h: delStatusLink = macro.return]

    [h: args = json.append("[]", callerID, returnCall, "Roll Recovery", "rollStat@lib:Traveller", json.append("[]", tabReturn, status), "roll", 32)]
    [h, macro("makeLink@Lib:Traveller"): args]
    [h: rollRecoveryLink = macro.return]

    [h: crudlinks = editStatusLink + delStatusLink + rollRecoveryLink]

    [h: htmlContent = htmlContent + "<tr class='black'><td><img src='" + icon + "' alt='" + status + " icon'></td><td>" + status + "</td><td>" + statusInfo + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
  }]
  [h: idxCount = idxCount + 1]
}]

<!-- Add Status Button -->
[h: args = json.append("[]", callerID, returnCall, "Add Status", "addStatus@lib:Traveller", json.append("[]", tabReturn), "plus", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: addStatusLink = macro.return]

[h: htmlContent = htmlContent + "</table><div class='crud'>" + addStatusLink + "</div></div>"]

<!-- Injuries Section -->
[h: injuriesList = getLibProperty("injuryList", "lib:Traveller")]  <!-- Get full injury details from the library -->
[h: injuriesJ = getProperty("Injuries", callerID)]  <!-- Get the list of injuries the character has -->
<!-- Only process injuries if the list is not empty and does not contain 'none' -->
[h, if(listCount(injuriesJ) > 0 && listFind(injuriesJ, "None") == -1 && listFind(injuriesJ, "none") == -1), code: {
    [h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Current Injuries</h3></div><table class='scrollable'>"]

    [h, foreach(injury, listSort(injuriesJ)), code: {  <!-- Use listSort to ensure proper order -->
      [h: injuryDetails = json.get(injuriesList, injury)]  <!-- Get full details for each injury -->
      
      [h: effect = json.get(injuryDetails, 0)]  <!-- Index 0 for Effect -->
      [h: healed = json.get(injuryDetails, 1)]  <!-- Index 1 for Healed -->
      [h: medicalCheck = json.get(injuryDetails, 2)]  <!-- Index 2 for Medical Check -->
      
      [h: args = json.append("[]", callerID, returnCall, "View", "viewInjury@lib:Traveller", json.append("[]", tabReturn, injury), "view", 32)]
      [macro("makeLink@Lib:Traveller"): args]
      [h: viewInjuryLink = macro.return]

      [h: args = json.append("[]", callerID, returnCall, "Delete", "jsonDel@Lib:Traveller", json.append("[]", tabReturn, injury, "Injuries"), "delete", 32)]
      [macro("makeLink@Lib:Traveller"): args]
      [h: delInjuryLink = macro.return]

      [h: crudlinks = viewInjuryLink + delInjuryLink]

      [h: htmlContent = htmlContent + "<tr class='black'><td>" + injury + "</td><td>" + effect + "</td><td>" + healed + "</td><td>" + medicalCheck + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
    }]
    [h: htmlContent = htmlContent + "</table></div>"]
};{
    [h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Current Injuries</h3></div><p>No current injuries.</p></div>"]
}]

<!-- Add Injury Button -->
[h: args = json.append("[]", callerID, returnCall, "Add Injury", "addInjury@lib:Traveller", json.append("[]", tabReturn), "plus", 32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: addInjuryLink = macro.return]

[h: htmlContent = htmlContent + "</table><div class='crud'>" + addInjuryLink + "</div>"]


<!-- Return HTML Content -->
[h: macro.return = htmlContent]
