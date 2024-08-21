[h: debug("Combat Macro Started")]

[h: callerID = json.get(macro.args,0)]
[h: returnCall = "CharSheet"]
[h: tabName = "Combat"]
[h: debug("<pre>callerID --> "+callerID+"</pre>")]
[h: debug("<pre>returnCall --> "+returnCall+"</pre>")]
[h: debug("<pre>tabName --> "+tabName+"</pre>")]

[h: htmlContent = ""]

<!-- Initiative Section -->
[h: debug("Initiative Section Start")]
[h: initiativeModsJ = json.get(getProperty("Modifiers", callerID), "InitiativeModifiers")]
[h: debug("initiativeModsJ --> " + initiativeModsJ)]
[h: baseInit = string(json.get(initiativeModsJ, 0))]
[h: curInit = string(json.get(initiativeModsJ, 1))]
[h: debug("baseInit --> " + baseInit + ", curInit --> " + curInit)]

[h: rollInitLink = makeLink(callerID, returnCall, "Roll Initiative", "rollInitiative@lib:Traveller", json.append("[]", tabName), "roll", 32)]
[h: delayLink = makeLink(callerID, returnCall, "Delay Initiative", "delayInitiative@lib:Traveller", json.append("[]", tabName), "delay", 32)]
[h: setInitLink = makeLink(callerID, returnCall, "Set Initiative", "setInitiative@lib:Traveller", json.append("[]", tabName), "add", 32)]
[h: editInitLink = makeLink(callerID, returnCall, "Modifiers", "editInitiative@lib:Traveller", json.append("[]", tabName), "edit", 32)]
[h: crudlinks = rollInitLink + delayLink + setInitLink + editInitLink]

[h: htmlContent = htmlContent + "<div class='section'><div class='heading'><h3>Initiative</h3></div><table class='scrollable'>"]
[h: htmlContent = htmlContent + "<tr style='width: 100%;' class='black'><td>Initiative</td><td>" + baseInit + "/" + curInit + "</td><td style='width: 100%; text-align: right;'>" + crudlinks + "</td></tr>"]
[h: htmlContent = htmlContent + "</table></div>"]
[h: debug("Initiative Section End")]

<!-- Combat Reactions Section -->
[h: debug("Combat Reactions Section Start")]
[h: reactions = json.get(getProperty("Combat", callerID), "Reactions")]
[h: debug("reactions --> " + reactions)]

[h: dodgeLink = makeLink(callerID, returnCall, "Dodge", "dodgeReaction@lib:Traveller", json.append("[]", tabName), "dodge", 32)]
[h: diveLink = makeLink(callerID, returnCall, "Dive for Cover", "diveForCoverReaction@lib:Traveller", json.append("[]", tabName), "dive", 32)]
[h: parryLink = makeLink(callerID, returnCall, "Parry", "parryReaction@lib:Traveller", json.append("[]", tabName), "parry", 32)]
[h: coverLink = makeLink(callerID, returnCall, "Take Cover", "takeCoverReaction@lib:Traveller", json.append("[]", tabName), "cover", 32)]
[h: combatActionsLinks = dodgeLink + diveLink + parryLink + coverLink]

[h: htmlContent = htmlContent + "<div class='section'><div class='heading'><h3>Combat Reactions</h3></div><table class='scrollable'>"]
[h: htmlContent = htmlContent + "<tr style='width: 100%;' class='black'><td style='width: 100%; text-align: right;'>Reactions:" + reactions + "</td><td>" + combatActionsLinks + "</td></tr>"]
[h: htmlContent = htmlContent + "</table></div>"]
[h: debug("Combat Reactions Section End")]

<!-- Attacks Section -->
[h: debug("Attacks Section Start")]
[h: attacksJ = getProperty("Attacks", callerID)]
[h: modifiersJ = getProperty("Modifiers", callerID)]
[h: debug("attacksJ --> " + attacksJ)]
[h: debug("modifiersJ --> " + modifiersJ)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Attacks</h3></div><table class='scrollable'>"]
[h, foreach(attackType, attacksJ), code: {
  [h: debug("Processing attackType --> " + attackType)]
  [h: attackInfo = json.get(attacksJ, attackType)]
  [h: debug("attackInfo --> " + attackInfo)]
  [h: skill = json.get(attackInfo, 0)]
  [h: stat = json.get(attackInfo, 1)]
  [h: weaponJ = getProperty("Weapons", callerID)]
  [h: weaponData = json.get(weaponJ, attackType)]
  [h: magCapacity = json.get(weaponData, 5)]
  [h: currentMag = if(json.get(weaponData, 6), json.get(weaponData, 6), 1)]
  [h: debug("weaponData --> " + weaponData + ", magCapacity --> " + magCapacity + ", currentMag --> " + currentMag)]

  [h: reloadLink = makeLink(callerID, returnCall, "Reload", "reloadWeapon@lib:Traveller", json.append("[]", tabName, attackType), "reload", 32)]
  [h: editModsLink = makeLink(callerID, returnCall, "Edit Modifiers", "editAttackMods@lib:Traveller", json.append("[]", tabName, attackType), "view", 32)]
  [h: editAttackLink = makeLink(callerID, returnCall, "Edit Attack", "editAttack@lib:Traveller", json.append("[]", tabName, attackType), "edit", 32)]
  [h: deleteAttackLink = makeLink(callerID, returnCall, "Delete", "jsonDel@Lib:Traveller", json.append("[]", tabName, attackType, "Attacks"), "delete", 32)]
  [h: rollAttackLink = makeLink(callerID, returnCall, "Roll Attack", "rollAttack@lib:Traveller", json.append("[]", tabName, attackType), "roll", 32)]
  [h: crudlinks = reloadLink + editModsLink + editAttackLink + deleteAttackLink + rollAttackLink]

  [h: htmlContent = htmlContent + "<tr class='black'><td>" + attackType + "</td><td>" + currentMag + "/" + magCapacity + "</td><td>" + skill + " (" + stat + ")</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
}]
[h: addAttackLink = makeLink(callerID, returnCall, "Add Attack", "addAttack@lib:Traveller", json.append("[]", tabName), "plus", 32)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addAttackLink + "</div></div>"]
[h: debug("Attacks Section End")]

<!-- Worn Armor and Defenses -->
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Defences</h3></div><table class='scrollable'>"]
[h: debug("Armour Section Start")]
[h: wornArmorList = getProperty("Defences", callerID)]  <!-- Get the list of worn armor items -->
[h: debug("<pre>Armor: "+wornArmorList+"</pre>")]
[h: totalKineticDefense = 0]
[h: totalEnergyDefense = 0]
[h: totalRadiationDefense = 0]

[h: htmlContent = htmlContent + "<tr class='heading'><td>Armor</td><td>Kinetic</td><td>Energy</td><td>Radiation</td></tr>"]
[h, foreach(wornArmor, wornArmorList), code: {
    [h: armorData = json.get(getProperty("Armor", callerID),wornArmor))]
    [h: debug("<pre>Armor: "+wornArmor+"</pre>")]
    [h: KD=number(json.get(armorData, 1))]
    [h: ED=number(json.get(armorData, 2))]
    [h: RD=number(json.get(armorData, 3))]
    [h: totalKineticDefense = totalKineticDefense + KD ]
    [h: debug("<pre>KD: "+KD+"</pre>")]
    [h: totalEnergyDefense = totalEnergyDefense + ED]
    [h: debug("<pre>ED: "+ED+"</pre>")]
    [h: totalRadiationDefense = totalRadiationDefense + RD]
    [h: debug("<pre>RD: "+RD+"</pre>")]
    [h: htmlContent = htmlContent + "<tr class='black'><td>" + wornArmor + "</td><td>" + KD + "</td><td>" + ED + "</td><td>" + RD + "</td></tr>"]
}]
[h: htmlContent = htmlContent + "</table></div>"]
[h: debug("Armour Section Ebd")]

<!-- Damage and Healing Section -->
[h: debug("Damage and Healing Section Start")]
[h: endJ = getProperty("Endurance", callerID)]
[h: strJ = getProperty("Strength", callerID)]
[h: dexJ = getProperty("Dexterity", callerID)]
[h: curEnd = number(json.get(endJ,"cur"))]
[h: curStr = number(json.get(strJ,"cur"))]
[h: curDex = number(json.get(dexJ,"cur"))]
[h: maxEnd = number(json.get(endJ,"max"))]
[h: maxStr = number(json.get(strJ,"max"))]
[h: maxDex = number(json.get(dexJ,"max"))]
[h: debug("curEnd --> " + curEnd + ", maxEnd --> " + maxEnd)]
[h: debug("curStr --> " + curStr + ", maxStr --> " + maxStr)]
[h: debug("curDex --> " + curDex + ", maxDex --> " + maxDex)]
[h: endPercentage = if(maxEnd > 0, floor((curEnd / maxEnd) * 100), 0)]
[h: strPercentage = if(maxStr > 0, floor((curStr / maxStr) * 100), 0)]
[h: dexPercentage = if(maxDex > 0, floor((curDex / maxDex) * 100), 0)]
[h: endBarColor = if(endPercentage > 50, "green", if(endPercentage > 20, "yellow", "red"))]
[h: strBarColor = if(strPercentage > 50, "green", if(strPercentage > 20, "yellow", "red"))]
[h: dexBarColor = if(dexPercentage > 50, "green", if(dexPercentage > 20, "yellow", "red"))]

[h: takeDamageLink = makeLink(callerID, returnCall, "Take Damage", "applyDamage@lib:Traveller", json.append("[]", tabName,callerID,0,"NA"), "minus", 32)]
[h: healLink = makeLink(callerID, returnCall, "Heal", "applyHealing@lib:Traveller", json.append("[]", tabName,callerID,0,"NA"), "plus", 32)]
[h: crudLinks = takeDamageLink + healLink]

[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Damage and Healing</h3></div><table class='scrollable'>"]
[h: htmlContent = htmlContent + "<tr class='black'><td>END: " + curEnd + "/" + maxEnd + "</td><td><div style='background-color:" + endBarColor + "; width:" + endPercentage + "%; height:10px;'></div></td></tr>"]
[h: htmlContent = htmlContent + "<tr class='black'><td>STR: " + curStr + "/" + maxStr + "</td><td><div style='background-color:" + strBarColor + "; width:" + strPercentage + "%; height:10px;'></div></td></tr>"]
[h: htmlContent = htmlContent + "<tr class='black'><td>DEX: " + curDex + "/" + maxDex + "</td><td><div style='background-color:" + dexBarColor + "; width:" + dexPercentage + "%; height:10px;'></div></td></tr>"]
[h: htmlContent = htmlContent + "<tr class='black'><td></td><td></td><td></td><td style='text-align: right;'>" + crudLinks  + "</td></tr>"]
[h: htmlContent = htmlContent + "</table></div>"]
[h: debug("Damage and Healing Section End")]



<!-- Statuses Section -->
[h: debug("Statuses Section Start")]
[h: statusesJ = getProperty("Statuses", callerID)]
[h: statusArray = json.append("[]", "Dead","Injured","Bleeding","Unconscious","Incapacitated","Stunned","Panicked","Blinded","Deafened","Drugged","Poisoned","Infected","Fatigued","Hot","Cold","Suffocating","Radiated","Sickness","Hidden","Prone")]
[h: debug("statusesJ --> " + statusesJ)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Statuses</h3></div><table class='scrollable'>"]
[h: idxCount = 0]
[h, foreach(status, json.toList(statusArray)), code: {
  [h: statusInfo = json.get(statusesJ, status)]
  [h: debug("status --> " + status + ", statusInfo --> " + statusInfo)]
  [h, if(number(statusInfo) != 0), code: {
    [h: icon = tblImage("StatusIcons", idxCount, 32)]

    [h: updateLink = makeLink(callerID, returnCall, "Update", "editStatus@lib:Traveller", json.append("[]", tabName, status), "edit", 32)]
    [h: removeLink = makeLink(callerID, returnCall, "Remove", "delStatus@Lib:Traveller", json.append("[]", tabName, status, "Statuses"), "delete", 32)]
    [h: rollRecoveryLink = makeLink(callerID, returnCall, "Roll Recovery", "rollStat@lib:Traveller", json.append("[]", tabName, "Endurance",status), "roll", 32)]
    [h: crudlinks = updateLink + removeLink + rollRecoveryLink]

    [h: htmlContent = htmlContent + "<tr class='black'><td><img src='" + icon + "' alt='" + status + " icon'></td><td>" + status + "</td><td>" + statusInfo + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
  }]
  [h: idxCount = idxCount + 1]
}]
[h: addStatusLink = makeLink(callerID, returnCall, "Add Status", "addStatus@lib:Traveller", json.append("[]", tabName), "plus", 32)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addStatusLink + "</div></div>"]
[h: debug("Statuses Section End")]

<!-- Injuries Section -->
[h: debug("Injuries Section Start")]
[h: injuriesList = getLibProperty("injuryList", "lib:Traveller")]
[h: injuriesJ = getProperty("Injuries", callerID)]
[h: debug("injuriesJ --> " + injuriesJ)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Current Injuries</h3></div>"]
[h, if(listCount(injuriesJ) > 0 ), code: {
    [h: htmlContent = htmlContent + "<table class='scrollable'>"]
    [h, foreach(injury, listSort(injuriesJ,"A+")), code: {
      [h: injuryDetails = json.get(injuriesList, injury)]
      [h: effect = json.get(injuryDetails, 0)]
      [h: healed = json.get(injuryDetails, 1)]
      [h: medicalCheck = json.get(injuryDetails, 2)]
      [h: debug("injury --> " + injury + ", effect --> " + effect + ", healed --> " + healed + ", medicalCheck --> " + medicalCheck)]

      [h: viewLink = makeLink(callerID, returnCall, "View", "viewPropList@lib:Traveller", json.append("[]", tabName, injury,"Injuries","injuryList"), "view", 32)]
      [h: editLink = makeLink(callerID, returnCall, "Edit", "editPropList@lib:Traveller", json.append("[]", tabName, injury,"Injuries","injuryList"), "edit", 32)]
      [h: deleteLink = makeLink(callerID, returnCall, "Delete", "delPropList@Lib:Traveller", json.append("[]", tabName, injury, "Injuries","injuryList"), "delete", 32)]
      [h: crudlinks = viewLink + editLink + deleteLink]

[h: htmlContent = htmlContent + "<tr class='black'><td>" + injury + "</td><td>" + effect + "</td><td>" + healed + "</td><td>" + medicalCheck + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
    }]
    [h: htmlContent = htmlContent + "</table></div>"]
};{
    [h: htmlContent = htmlContent + "<p>No current Injuries.</p></div>"]
}]
[h: addInjuryLink = makeLink(callerID, returnCall, "Add Injury", "addPropList@lib:Traveller", json.append("[]", tabName,"Injuries","injuryList"), "plus", 32)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addInjuryLink + "</div>"]
[h: debug("Injuries Section End")]

<!-- Infections Section -->
[h: debug("Infections Section Start")]
[h: infectionsList = getLibProperty("infectionList", "lib:Traveller")]
[h: infectionsL = listSort(getProperty("Infections", callerID),"A+")]
[h: debug("infectionsL --> " + infectionsL)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Current Infections</h3></div>"]
[h, if(listCount(infectionsL) > 0) , code: {
    [h: htmlContent = htmlContent + "<table class='scrollable'>"]
    [h, foreach(infection, infectionsL), code: {
      [h: infectionDetails = json.get(infectionsList, infection)]
      [h: effect = json.get(infectionDetails, 0)]
      [h: treated = json.get(infectionDetails, 1)]
      [h: medicalCheck = json.get(infectionDetails, 2)]
      [h: debug("infection --> " + infection + ", effect --> " + effect + ", treated --> " + treated + ", medicalCheck --> " + medicalCheck)]

      [h: viewLink = makeLink(callerID, returnCall, "View", "viewPropList@lib:Traveller", json.append("[]", tabName, infection,"Infections","infectionList"), "view", 32)]
      [h: editLink = makeLink(callerID, returnCall, "Edit", "editPropList@lib:Traveller", json.append("[]", tabName, infection,"Infections","infectionList"), "edit", 32)]
      [h: deleteLink = makeLink(callerID, returnCall, "Delete", "delPropList@Lib:Traveller", json.append("[]", tabName, infection, "Infections","infectopnList"), "delete", 32)]
      [h: crudlinks = viewLink + deleteLink]

      [h: htmlContent = htmlContent + "<tr class='black'><td>" + infection + "</td><td>" + effect + "</td><td>" + treated + "</td><td>" + medicalCheck + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
    }]
    [h: htmlContent = htmlContent + "</table></div>"]
};{
  [h: htmlContent = htmlContent + "<p>No current Infections effects.</p></div>"]
}]
[h: addInfectionLink = makeLink(callerID, returnCall, "Add Infection", "addPropList@lib:Traveller", json.append("[]", tabName,"Infections","infectionList"), "plus", 32)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addInfectionLink + "</div>"]
[h: debug("Infections Section End")]

<!-- Drugs Section -->
[h: debug("Infections Section Start")]
[h: drugsList = getLibProperty("drugList", "lib:Traveller")]
[h: drugsL = listSort(getProperty("Drugs", callerID),"A+")]
[h: debug("drugsL --> " + drugsL)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Current Drugs</h3></div>"]
[h, if(listCount(drugsL) > 0) , code: {
    [h: htmlContent = htmlContent + "<table class='scrollable'>"]
    [h, foreach(drug, drugsL), code: {
      [h: drugDetails = json.get(drugsList,drug)]
      [h: effect = json.get(drugDetails, 0)]
      [h: duration = json.get(drugDetails, 1)]
      [h: dosage = json.get(drugDetails, 2)]
      [h: debug("Drugs --> " + drug + ", effect --> " + effect + ", duration --> " + duration + ", dosage --> " + dosage )]
      [h: viewLink = makeLink(callerID, returnCall, "View", "viewPropList@lib:Traveller", json.append("[]", tabName, drug,"Drugs","drugsList"), "view", 32)]
      [h: editLink = makeLink(callerID, returnCall, "Edit", "editPropList@lib:Traveller", json.append("[]", tabName, drug,"Drugs","drugsList"), "edit", 32)]
      [h: deleteLink = makeLink(callerID, returnCall, "Delete", "delPropList@Lib:Traveller", json.append("[]", tabName, drug, "Drugs","drugsList"), "delete", 32)]
      [h: crudlinks = viewLink + deleteLink]

      [h: htmlContent = htmlContent + "<tr class='black'><td>" + drug + "</td><td>" + effect + "</td><td>" + duration + "</td><td>" + medicalCheck + "</td><td style='width: 10%; text-align: right;'>" + crudlinks + "</td></tr>"]
    }]
    [h: htmlContent = htmlContent + "</table></div>"]
};{
  [h: htmlContent = htmlContent + "<p>No current Drug effects.</p></div>"]
}]
[h: addDrugLink = makeLink(callerID, returnCall, "Add Drug", "addPropList@lib:Traveller", json.append("[]", tabName,"Drugs","drugList"), "plus", 32)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addDrugLink + "</div>"]
[h: debug("Infections Section End")]


<!-- Return HTML Content -->
[h: debug("Returning HTML Content")]
[h: debug("Combat Macro Stopped")]
[h: macro.return = htmlContent]
