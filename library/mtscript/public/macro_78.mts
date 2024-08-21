[h: debug = getLibProperty("debug","lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: traitsList = json.get(macro.args, 3)]
[h: weaponTrait = json.get(macro.args, 4)]

[h, if (debug == 1): broadcast("<pre>getTrait-list ==> " + traitsList + "</pre>")]
[h, if (debug == 1): broadcast("<pre>getTrait-trait ==> " + weaponTrait + "</pre>")]

[h: weaponType = listGet(traitsList, 0)]
[h: damageType = listGet(traitsList, 1)]
[h: ap = "0"]
[h: auto = "0"]
[h: blast = "0"]
[h: bulky = 0]
[h: radiation = 0]
[h: scope = 0]
[h: smart = "None"]
[h: stun = 0]
[h: veryBulky = 0]
[h: zeroG = 0]
[h: auxGrenadeLauncher = 0]
[h: gyrostabiliser = 0]
[h: laserSight = 0]
[h: secureWeapon = 0]
[h: suppressor = 0]

[h: weaponType = listGet(traitsList, 0)]
[h: damageType = listGet(traitsList, 1)]

[h, foreach(trait, traitsList), code: {
	[h: atrait = stringToList(trait, " ")]
    [h, if (debug == 1): broadcast("<pre>Trait ==> " + atrait + "</pre>")]
    [h: ap = if(listGet(atrait,0) == "AP", listGet(atrait,1), ap)]
    [h: auto = if(listGet(atrait,0) == "Auto", listGet(atrait,1), auto)]
    [h: blast = if(listGet(atrait,0) == "Blast", listGet(atrait,1), blast)]
    [h: bulky = if(listGet(atrait,0) == "Bulky", 1, bulky)]
    [h: radiation = if(listGet(atrait,0) == "Radiation", 1,radiation)]
    [h: scope = if(listGet(atrait,0) == "Scope", 1, scope)]
    [h: smart = if(listGet(atrait,0) == "Smart",listGet(atrait,2),smart)]
    [h: stun = if(listGet(atrait,0) == "Stun", 1, stun)]
    [h: veryBulky = if(listGet(atrait,0) ==  "Very", 1, veryBulky)]
    [h: zeroG = if(listGet(atrait,0) == "Zero-G", 1, zeroG)]
    [h: auxGrenadeLauncher = if(listGet(atrait,0) == "Auxiliary", 1, auxGrenadeLauncher)]
    [h: gyrostabiliser = if(listGet(atrait,0) == "Gyrostabiliser", 1, gyrostabiliser)]
    [h: laserSight = if(listGet(atrait,0) == "Laser", 1, laserSight)]
    [h: secureWeapon = if(listGet(atrait,0) == "Secure", 1, secureWeapon)]
    [h: suppressor = if(listGet(atrait,0) == "Suppressor", 1, suppressor)]
}]

[h: retVal = ""]
[h, switch(weaponTrait),code:
case "Weapon Type": {[retVal = json.set("{}","Weapon Type",weaponType)]};
case "Damage Type": {[retVal = json.set("{}","Damage Type",damageType)]};
case "AP": {[retVal = json.set("{}","AP",ap)]};
case "Auto": {[retVal = json.set("{}","Auto",auto)]};
case "Blast": {[retVal = json.set("{}","Blast",blast)]};
case "Bulky": {[retVal = json.set("{}","Bulky",bulky)]};
case "Radiation": {[retVal = json.set("{}","Radiation",radiation)]};
case "Scope": {[retVal = json.set("{}","Scope",scope)]};
case "Smart Weapon": {[retVal = json.set("{}","Smart Weapon",smart)]};
case "Stun": {[retVal = json.set("{}","Stun",stun)]};
case "Very Bulky": {[retVal = json.set("{}","Very Bulky",veryBulky)]};
case "Zero-G": {[retVal = json.set("{}","Zero-G",zeroG)]};
case "Auxiliary Grenade Launcher": {[retVal = json.set("{}","Auxiliary Grenade Launcher",auxGrenadeLauncher)]};
case "Gyrostabiliser": {[retVal = json.set("{}","Gyrostabiliser",gyrostabiliser)]};
case "Laser Sight": {[retVal = json.set("{}","Laser Sight",laserSight)]};
case "Secure Weapon": {[retVal = json.set("{}","Secure Weapon",secureWeapon)]};
case "Suppressor": {[retVal = json.set("{}","Suppressor",suppressor)]};
case "All": {
    [retVal = json.set("{}","Weapon Type",weaponType,"Damage Type",damageType,"AP", ap, "Auto", auto, "Blast", blast, "Bulky", bulky, "Radiation", radiation, "Scope", scope, "Smart Weapon", smart, "Stun", stun, "Very Bulky", veryBulky, "Zero-G", zeroG, "Auxiliary Grenade Launcher", auxGrenadeLauncher, "Gyrostabiliser", gyrostabiliser, "Laser Sight", laserSight, "Secure Weapon", secureWeapon, "Suppressor", suppressor)]
};
default:{[retVal = 0]};
]
[h, if (debug == 1): broadcast("<pre>getTrait-return ==> " + json.indent(retVal) + "</pre>")]
[h: macro.return = retVal]



