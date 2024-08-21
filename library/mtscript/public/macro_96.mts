[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("toggleArmor Started")]
[h: callerID = json.get(macro.args,0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: itemName = json.get(macro.args, 3)]
[h: worn = json.get(macro.args, 4)]
[h, if (debug == 1): broadcast("Armour: " + itemName)]
[h: defencesL = getProperty("Defences",callerID)]
[h, if (debug == 1): broadcast("Defences (before): "+defencesL)]

[h: index = listFind(defencesL, itemName, ",")]
[h, if (debug == 1): broadcast("Index: " + index)]

[h, if (worn == 0), code: {
    [h, if (index == -1): defencesL = listAppend(defencesL, itemName, ",")]
    [h, if (debug == 1): broadcast("Defences after wearing: " + defencesL)]
};{
    [h, if (index >= 0): defencesL = listDelete(defencesL, index, ",")]
    [h, if (debug == 1): broadcast("Defences after removing: " + defencesL)]
}]

[h: armorJ = getProperty("Armor",callerID)]
[h: armorL = json.fields(armorJ)]

[h, if (debug == 1): broadcast("Cleaned and Sorted Defences: " + defencesL)]
[h:techLevel = 0]
[h, foreach(def,defencesL), code: {
   [h: armorInfo = json.get(armorJ,def)]
   [h: aTL = number(json.get(armorInfo,0))]
   [h: techLevel = if(aTL > techLevel, aTL, techLevel)]
}]
[h, if (debug == 1): broadcast("Current TechLevel of Defences: " + getProperty("TL",callerID)]
[h, if (debug == 1): broadcast("TechLevel of Defences: " + techLevel)]
[h: setProperty("TL", techLevel,callerID)]
[h: setProperty("Defences", defencesL, callerID)]

[h, if (debug == 1): broadcast("toggleArmor Stopped")]

<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[h, macro(returnCall + "@lib:Traveller"): args]
