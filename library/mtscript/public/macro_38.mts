[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: skillName = arg(2)]
[h: skillLevel = arg(3)]

[h: input = input(
    "newLevel|" + skillLevel + "|New Level for " + skillName + "|text"
)]

[h, if (input), code: {
	[h:setSkill(callerID,skillName,newLevel)]
}]

[r: say(callerid,"Skill "+skillName+" Edited")]
[h: args = json.append("[]",callerID,"Skills")]
[macro(returnCall + "@lib:Traveller"): args]