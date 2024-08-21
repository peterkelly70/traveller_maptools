[r: callerID = json.get(macro.args, 0) ]
[r: skillName = json.get(macro.args, 1) ]
[r: skillValue = json.get(macro.args, 2) ]
[r: skillJ = if(isPC(callerID), getProperty("Skills", callerID), getProperty("skillList", callerID))]
[h: skillj=json.set(skillJ,skillName,skillValue)]

[h, if (isPC(callerID)), code: {
    [h: setProperty("Skills", skillJ, callerID)]
};{
    [h: setProperty("skillList", skillJ, callerID)]
}]


