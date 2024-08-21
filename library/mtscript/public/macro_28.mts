[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: input = input(
    "junk|Enter new skill|-|LABEL|SPAN=TRUE",
    "skillName|Skill Name|Name|TEXT",
    "skillLevel|-3,0,1,2,3|Skill level|LIST|SELECT=1 VALUE=STRING"
)]

[h: skillJ = if(returnCall == "CharSheet", getProperty("Skills", callerID), getProperty("skillList", callerID))]
[h, if (input), code: {
    [h: skillJ = json.set(skillJ, skillName, skillLevel)]    
    [h: args = json.append("[]",skillJ)]
    [macro("jsonSort@lib:Traveller"): args]
    [h: skillJ = macro.return]
}]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Skills", skillJ, callerID)]
};{
    [h: setProperty("skillList", skillJ, callerID)]
}]

[h: args = json.append("[]",callerId,"Skill "+skillName+" Added by "+callerID)]
[macro("say@lib:Traveller"):args]

[h: args = json.append("[]",callerID,"Skills")]
[macro(returnCall + "@lib:Traveller"): args]
