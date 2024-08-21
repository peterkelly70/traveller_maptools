[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: doc="Name{TL-0,Range-1,Damage-2,Weight-3,Cost-4,Mag-5,MagCost-6,Traits-7}"]


[h: dropTL = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"]
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: damageTypes = "Kinetic,Energy,Explosive,Stun"]
[h: dropWT = "Melee,Slug,Energy,Grenade,Heavy"]
[h: dropSmart = "None,TL11,TL13"]

[h: input = input(
    "junk|Enter new Weapon|-|LABEL|SPAN=TRUE",
    "name|Name|Name|TEXT",
    "tl|" + dropTL + "|Tech Level|LIST|VALUE=STRING",
    "weaponType|" + dropWT + "|Weapon Type|LIST|VALUE=STRING",
    "range|Range|Range|TEXT",
    "damage|1d6|Damage|TEXT",
    "damageType|" + damageTypes + "|Damage Type|LIST|VALUE=STRING",
    "weight|Weight|Weight|TEXT",
    "cost|Cost|Cost|TEXT",
    "mag|0|Mag Size|TEXT",
    "magCost|0|Mag Cost|TEXT",
    "ap|" + dropTen + "|AP|LIST|VALUE=STRING",
    "auto|" + dropTen + "|Auto|LIST|VALUE=STRING",
    "bulky|0|Bulky|CHECK",
    "blast|" + dropTen + "|Blast|LIST|VALUE=STRING",
    "radiation|0|Radiation|CHECK",
    "scope|0|Scope|CHECK",
    "smart|"+dropSmart+"|Smart Weapon|LIST|VALUE=STRING",
    "stun|0|Stun|CHECK",
    "veryBulky|0|Very Bulky|CHECK",
    "zeroG|0|Zero-G|CHECK",
    "auxGrenadeLauncher|0|Auxiliary Grenade Launcher|CHECK",
    "gyrostabiliser|0|Gyrostabiliser|CHECK",
    "laserSight|0|Laser Sight|CHECK",
    "secureWeapon|0|Secure Weapon|CHECK",
    "suppressor|0|Suppressor|CHECK"
)]

[h: weaponJ = if(returnCall == "CharSheet", getProperty("weapons", callerID), getProperty("weaponsList", callerID))]
[h, if (input), code: {
    [h: traitsList = listAppend("", weaponType)]
    [h: traitsList = listAppend(traitsList, damageType)]
    [h, if(ap != "0"): traitsList = listAppend(traitsList, "AP " + ap)]
    [h, if(auto != "0"): traitsList = listAppend(traitsList, "Auto " + auto)]
    [h, if(bulky == 1): traitsList = listAppend(traitsList, "Bulky")]
    [h, if(blast != "0"): traitsList = listAppend(traitsList, "Blast " + blast)]
    [h, if(radiation == 1): traitsList = listAppend(traitsList, "Radiation")]
    [h, if(scope != "0"): traitsList = listAppend(traitsList, "Scope")]
    [h, if(smart != "None"): traitsList = listAppend(traitsList, "Smart Weapon " + smart)]
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

[h: args = json.append("[]", callerID, "Weapons")]
[macro(returnCall + "@lib:Traveller"): args]
