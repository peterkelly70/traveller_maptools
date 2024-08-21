[h: debug("RollStat Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: stat = json.get(macro.args, 3)]
[h: rollFor = json.get(macro.args, 4)]
[h: statList = getLibProperty("statsList", "lib:Traveller")]
[h: rIdx = max(listFind(statList,stat),0)]
[h: difficultyList = "Simple,Easy,Routine,Average,Difficult,Very Difficult,Formidable"]
[h: difficultyValues = "2,4,6,8,10,12,14"]
[h: resultMsg="Cancelled"]
[h: input = input(
    "selectedStat|"+statList+"|Select a stat|LIST|SELECT="+rIdx,
    "miscMod|-5,-4,-3,-2,-1,0,1,2,3,4,5|Misc Mod|LIST|SELECT=5 VALUE=STRING",
    "difficulty|"+difficultyList+"|Select Difficulty|LIST|SELECT=3 VALUE=STRING"
)]
[h: debug("Input Selected")]
[h, if(input != 0), code: {
	[h: stat = listGet(statList,selectedStat)]
    [h, if(isPC(callerID)), code: {
    	[h:statVal=getStat(callerID, stat, "cur")]
    };{
    	[h:getStat(callerID, stat)]
    }]

    [h: statDM = getStatDM(statVal)]
    [h: debug(stat+": "+statVal+"("+statDM+")")]
    [h: difficultyIndex = listFind(difficultyList, difficulty)]
    [h: difficultyTarget = listGet(difficultyValues, difficultyIndex)]

    [h: roll = 2d6]
    [h: rollResult = roll +  statDM + miscMod]
    [h: effect = rollResult - difficultyTarget]

    [h: tooltipText = "<html>Roll: " + roll + "<br>Stat DM: " + statDM + "<br>Misc Mod: " + miscMod + "<br>Difficulty: " + difficultyTarget + "<br>Effect: " + effect + "</html>"]
    [h: resultMsg = "<span title='" + tooltipText + "'>" + rollFor + "("+stat+"): " + rollResult + " (Effect: " + effect + ")</span>"]
    [h: debug("resultMsg->"+resultMsg)]
    <!-- Handle unique rolls -->
    [h, switch(rollFor), code:
        case "Stunned": {
       	    [h: debug("Stunned")]
            [h: args = json.append("[]", callerID, effect)]
            [h, macro("setStealth@lib:Traveller"): args]
            [h: resultMsg = resultMsg + "<br>Stealth aura set based on effect: " + effect)]
        };
        default: {
			[h: dummy=0]
        }]
        [r: say(callerID, resultMsg)]
}]

[h: debug("RollStat Stopped")]
