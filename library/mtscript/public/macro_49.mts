[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: doc="Name{TL-0,Range-1,Damage-2,Weight-3,Cost-4,Mag-5,MagCost-6,Traits-7}"]
[h: input = input(
    "junk|Enter new Weapon|-|LABEL|SPAN=TRUE",
    "name|Name|Name|TEXT",
    "tl|Tech Level|Tech Level|TEXT",
    "range|Range|Range|TEXT",
    "damage|1d6|Damage|TEXT",
    "weight|Weight|Weight|TEXT",
    "cost|Cost|Cost|TEXT",
    "mag|0|Mag Size|TEXT",
    "magCost|0|Mag Cost|TEXT",
    "traits|Traits|Traits|TEXT"
)]

[h: weaponJ = if(returnCall == "CharSheet", getProperty("weapons", callerID), getProperty("weaponsList", callerID))]
[h, if (input), code: {
	[h: weaponStats = json.append("[]",tl,range,damage,weight,cost,mag,magcost,traits)]
    [h: weaponJ = json.set(weaponJ,name,weaponStats)]    
    [h: args = json.append("[]",weaponJ)]
    [macro("jsonSort@lib:Traveller"): args]
    [h: weaponJ = macro.return]
}]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Weapons", weaponJ, callerID)]
};{
    [h: setProperty("weaponsList", weaponJ, callerID)]
}]

[h: args = json.append("[]",callerId,"Weapon "+name)]
[macro("say@lib:Traveller"):args]

[h: args = json.append("[]",callerID,"Weapons")]
[macro(returnCall + "@lib:Traveller"): args]
