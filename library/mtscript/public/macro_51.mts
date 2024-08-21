[h: callerID = json.get(macro.args,0)]
[h: returnCall = json.get(macro.args,1)]
[h: armourType = json.get(macro.args, 2)]


[h: input = input(
    "newLevel|" + skillLevel + "|New Level for " + skillName + "|text"
)]

[h, if (input), code: {
	[h: args = json.append("[]", callerID, returnCall,)]
	[macro("setSkill@lib:Traveller"): args]
}]


[h: armourJ = if(returnCall == "CharSheet", getProperty("Armour", callerID), getProperty("skillList", callerID))]

[h:skillJ = json.remove(skillJ,skillName)]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Skills", skillJ, callerID)]
};{
    [h: setProperty("skillList", skillJ, callerID)]
}]

[h: args = json.append("[]",callerID,"Skill "+skillName+" Removed by "+callerID)]
[macro("say@lib:Traveller"):args]

[h: args = json.append("[]",callerID,"Skills")]
[macro(returnCall + "@lib:Traveller"): args]
