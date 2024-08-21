[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("RollSkill Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: skillName = json.get(macro.args, 2)]
[h: skillLevel = json.get(macro.args, 3)]
[h: statList = getLibProperty("statsList", "lib:Traveller")]

[h: difficultyList = "Simple,Easy,Routine,Average,Difficult,Very Difficult,Formidable"]
[h: difficultyValues = "2,4,6,8,10,12,14"]

[h: input = input(
    "selectedStat|"+statList+"|Select a stat|LIST|SELECT=0 VALUE=STRING",
    "miscMod|-5,-4,-3,-2,-1,0,1,2,3,4,5|Misc Mod|LIST|SELECT=5 VALUE=STRING",
    "difficulty|"+difficultyList+"|Select Difficulty|LIST|SELECT=3 VALUE=STRING"
)]

[h, if(input != 0), code: {
    [h: statValueArgs = json.append("[]", callerID, selectedStat, "cur")]
    [h, macro("getStat@lib:Traveller"): statValueArgs]
    [h: statValue = macro.return]
    [h: statModArgs = json.append("[]", statValue)]
    [h, macro("getModifier@lib:Traveller"): statModArgs]
    [h: statDM = macro.return]

    [h: difficultyIndex = listFind(difficultyList, difficulty)]
    [h: difficultyTarget = listGet(difficultyValues, difficultyIndex)]

    [h: roll = 2d6]
    [h: rollResult = roll + skillLevel + statDM + miscMod]
    [h: effect = rollResult - difficultyTarget]

    [h: tooltipText = "<html>Roll: " + roll + "<br>Skill Level: " + skillLevel + "<br>Stat DM: " + statDM + "<br>Misc Mod: " + miscMod + "<br>Difficulty: " + difficultyTarget + "<br>Effect: " + effect + "</html>"]
    [h: resultMsg = "<span title='" + tooltipText + "'>" + skillName + ": " + rollResult + " (Effect: " + effect + ")</span>"]

    [h: args = json.append("[]", callerID, resultMsg)]
    [macro("say@lib:Traveller"): args]

    <!-- Handle unique skill rolls -->
    [h, switch(skillName), code:
        case "Stealth": {
            [h: args = json.append("[]", callerID, effect)]
            [h, macro("setStealth@lib:Traveller"): args]
            [h: args = json.append("[]", callerID, "Stealth aura set based on effect: " + effect)]
            [macro("say@lib:Traveller"): args]
        };
        default: {
			[h: dummy=0]
        }]
}]

[h, if (debug == 1): broadcast("RollSkill Stopped")]
