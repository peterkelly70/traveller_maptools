[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("reloadWeapons Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: weaponName = json.get(macro.args, 3)]

[h,switch(returnCall),code:
case "CharSheet": {
  [h: weaponJ=getProperty("weapons", callerID)]
  [h: supplyJ=getProperty("Supplies", callerID)]
};
case "NPCSheet": {
  [h: weaponJ=getProperty("weapons", callerID)]
  [h: supplyJ=getProperty("Supplies", callerID)]
};
case "Admin": {
  [h: weaponJ=getLibProperty("weaponsList", "lib:Traveller")]
  [h: supplyJ=getLibProperty("SupplyList", "lib:Traveller")]
};
default: {
  [h: weaponJ=getProperty("weapons", callerID)]
  [h: supplyJ=getProperty("Supplies", callerID)]
}]

[h: weaponData = json.get(weaponJ, weaponName)]
[h: supplyData = json.get(supplyJ, weaponName)]

[h: tl = json.get(weaponData, 0)]
[h: range = json.get(weaponData, 1)]
[h: damage = json.get(weaponData, 2)]
[h: weight = json.get(weaponData, 3)]
[h: cost = json.get(weaponData, 4)]
[h: magCapacity = json.get(weaponData, 5)]
[h: magCost = json.get(weaponData, 6)]
[h: traitsList = json.get(weaponData, 7)]

[h: itemCount = json.get(weaponData, 0)]
[h: itemCapacity = json.get(weaponData, 1)]
[h: itemType = json.get(weaponData, 2)]


[h: args = json.append("[]", callerID,returnCall,tabReturn,traitsList,"Weapon Type")]
[h, macro("getTrait@lib:Traveller"): args]
[h: weaponType = macro.return]
[h: weaponType = json.get(weaponType,"Weapon Type")]
[h, if (debug == 1): broadcast("<pre>Weapon Type ==> " + weaponType + "</pre>")]
[h, if (itemCount > 0), code: {
   [h: nuItem=json.append("[]",itemCount,magCapacity,itemType)]	
   [h: supplyJ = json.set(supplyJ,weaponName,nuItem)]
   [h: itemCount = itemCount-1]
};{
   [h: args = json.append("[]", callerID, "Unable to Reload Weapon " + weaponName + ", no clips")]
   [h, macro("say@lib:Traveller"): args]
   [abort(0)]
}]


[h,switch(returnCall),code:
case "CharSheet": {
  [h: setProperty("Supplies", supplyJ, callerID)]
};
case "NPCSheet": {
  [h: setProperty("Supplies", supplyJ, callerID)]
};
case "Admin": {
  [h: setLibProperty("SupplyList", supplyJ, "lib:Traveller")]
};
default: {
  [h: setProperty("Supplies", supplyJ, callerID)]
}]

[h: args = json.append("[]", callerID, "Weapon " + weaponName + " Reloaded")]
[h, macro("say@lib:Traveller"): args]

[h, if (debug == 1): broadcast("reloadWeapons Stopped")]

[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
