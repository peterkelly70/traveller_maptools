[h: broadcast("In newSkill","GM")]

[h: broadcast(macro.args,"GM")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: skillName = json.get(macro.args, 2)]
[h: skillLevel = json.get(macro.args, 3)]
[h: skillJ = getProperty("Skills",callerID)]
[h: nuSKill = json.set("{}",skillName,skillLevel)]
[h: args = json.append("{}",callerID,skillJ)]
[macro ("jsonSort@lib:Traveller"):args]
[h: nuSkillJ=macro.return]
[h, if(returnCall=="CharSheet"), code: {
  [h: setProperty("Skills",nuSkillJ,callerID)]
};{
[h: setProperty("skillList",nuSkillJ,callerID)]
}]


[r: broadcast(nuSkillJ,"all")]

