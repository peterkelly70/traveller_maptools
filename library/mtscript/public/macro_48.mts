[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: weaponName = json.get(macro.args, 3)]
[h: weaponJ = if(returnCall == "CharSheet", getProperty("weapons", callerID), getLibProperty("weaponsList", "lib:Traveller"))]
[h: weaponData = json.get(weaponJ, weaponName)]
[h: broadcast("<pre>Weapon ==> " + json.indent(weaponData) + "</pre>")]

[h: dropTL = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"]
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: damageTypes = "Kinetic,Energy,Radiation,Explosive,Stun,Corrosive,Cold,Heat"]
[h: dropWT = "Melee,Slug,Beam,Grenade,Heavy"]
[h: dropSmart = "None,TL11,TL13"]

[h: tl = json.get(weaponData, 0)]
[h: range = json.get(weaponData, 1)]
[h: damage = json.get(weaponData, 2)]
[h: weight = json.get(weaponData, 3)]
[h: cost = json.get(weaponData, 4)]
[h: mag = json.get(weaponData, 5)]
[h: magCost = json.get(weaponData, 6)]
[h: traitsList = json.get(weaponData, 7)]


[h: args = json.append("[]", callerID,returnCall,tabReturn,traitsList,"All")]
[macro("getTrait@lib:Traveller"): args]
[h: traitsJson = macro.return]
[h: broadcast("<pre>getTrait(all) ==> " + json.indent(traitsJson) + "</pre>")]

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

[h: wpIndx = listFind(dropWT, weaponType)]
[h: dtIndx = listFind(damageTypes, damageType)]
[h: smartIdx = listFind(dropSmart, smart)]

[h: input = input(
    "junk|Edit Weapon: " + weaponName + "|-|LABEL|SPAN=TRUE",
    "name|"+weaponName+"|Name|TEXT" ,
    "tl|" + dropTL + "|Tech Level|LIST|SELECT=" + tl + " VALUE=STRING",
    "weaponType|" + dropWT + "|Weapon Type|LIST|SELECT=" + wpIndx + " VALUE=STRING",
    "range|"+range+"|Range|TEXT" ,
    "damage|"+damage+"|Damage|TEXT",
    "damageType|" + damageTypes + "|Damage Type|LIST|SELECT=" + dtIndx + " VALUE=STRING",
    "weight|"+weight+"|Weight|TEXT" ,
    "cost|"+cost+"|Cost|TEXT",
    "mag|"+mag+"|Mag Size|TEXT",
    "magCost|"+magCost+"|Mag Cost|TEXT",
    "ap|" + dropTen + "|AP|LIST|SELECT=" + ap + " VALUE=STRING",
    "auto|" + dropTen + "|Auto|LIST|SELECT=" + auto + " VALUE=STRING",
    "bulky|"+bulky+"|Bulky|CHECK",
    "blast|" + dropTen + "|Blast|LIST|SELECT=" + blast + " VALUE=STRING",
    "radiation|"+radiation+"|Radiation|CHECK" ,
    "scope|"+scope+"|Scope|CHECK",
    "smart|"+smart+"|Smart|CHECK",
    "stun|"+stun+"|Stun|CHECK",
    "veryBulky|"+veryBulky+"|Very Bulky|CHECK",
    "zeroG|"+zeroG+"|Zero-G|CHECK",
    "auxGrenadeLauncher|"+auxGrenadeLauncher+"|Auxiliary Grenade Launcher|CHECK",
    "gyrostabiliser|"+gyrostabiliser+"|Gyrostabiliser|CHECK",
    "laserSight|"+laserSight+"|Laser Sight|CHECK",
    "secureWeapon|"+secureWeapon+"|Secure Weapon|CHECK",
    "suppressor|"+suppressor+"|Suppressor|CHECK" 
)]

[h, if (input), code: {
    [h: traitsList = listAppend("", weaponType)]
    [h: traitsList = listAppend(traitsList, damageType)]
    [h, if(ap != "0"): traitsList = listAppend(traitsList, "AP " + ap)]
    [h, if(auto != "0"): traitsList = listAppend(traitsList, "Auto " + auto)]
    [h, if(bulky == 1): traitsList = listAppend(traitsList, "Bulky")]
    [h, if(blast != "0"): traitsList = listAppend(traitsList, "Blast " + blast)]
    [h, if(radiation == 1): traitsList = listAppend(traitsList, "Radiation")]
    [h, if(scope == 1): traitsList = listAppend(traitsList, "Scope")]
    [h, if(smart == 1): traitsList = listAppend(traitsList, "Smart Weapon")]
    [h, if(stun == 1): traitsList = listAppend(traitsList, "Stun")]
    [h, if(veryBulky == 1): traitsList = listAppend(traitsList, "Very Bulky")]
    [h, if(zeroG == 1): traitsList = listAppend(traitsList, "Zero-G")]
    [h, if(auxGrenadeLauncher == 1): traitsList = listAppend(traitsList, "Auxiliary Grenade Launcher")]
    [h, if(gyrostabiliser == 1): traitsList = listAppend(traitsList, "Gyrostabiliser")]
    [h, if(laserSight == 1): traitsList = listAppend(traitsList, "Laser Sight")]
    [h, if(secureWeapon == 1): traitsList = listAppend(traitsList, "Secure Weapon")]
    [h, if(suppressor == 1): traitsList = listAppend(traitsList, "Suppressor")]

    [h: weaponStats = json.append("[]", tl, range, damage, weight, cost, mag, magCost, traitsList)]
    [h: weaponJ = json.set(weaponJ, name, weaponStats)]    
    [h: args = json.append("[]", weaponJ)]
    [macro("jsonSort@lib:Traveller"): args]
    [h: weaponJ = macro.return]
    [h: broadcast("<pre>Weapon Traits ==> " + traitsList + "</pre>")]
}]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Weapons", weaponJ, callerID)]
};{
    [h: setProperty("weaponsList", weaponJ, callerID)]
}]

[h: args = json.append("[]", callerID, "Weapon " + name)]
[macro("say@lib:Traveller"): args]

[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]



