[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: skillName = json.get(macro.args, 2)]
[h: skillLevel = json.get(macro.args, 3)]
[h: skillJ = if(returnCall == "CharSheet", getProperty("Skills", callerID), getProperty("skillList", callerID))]

[h: input = input(
"junkVar|"+skillName+"|Delete?|LABEL"
)]

[h, if(input), code: {
        [h:skillJ = json.remove(skillJ,skillName)]
        [h:output=skillName+" deleted!"
    }, code: {
        [h: output = "Deletion cancelled."]
    }]
}]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Skills", skillJ, callerID)]
};{
    [h: setProperty("skillList", skillJ, callerID)]
}]

[h: args = json.append("[]",callerID,output)]
[macro("say@lib:Traveller"):args]

[h: args = json.append("[]",callerID,"Skills")]
[macro(returnCall + "@lib:Traveller"): args]
