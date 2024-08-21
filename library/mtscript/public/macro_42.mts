[h: callerID = json.get(macro.args, 0) ]
[h: skillName = json.get(macro.args, 1) ]
[h: skillValue = if(isPC(callerID), json.get(getProperty("Skills",callerID),skillName), json.get(getLibProperty("skillList", "lib:Traveller"),skillName))]
[h: macro.return = skillValue]