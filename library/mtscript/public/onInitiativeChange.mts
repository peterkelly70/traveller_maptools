[h: debug = getLibProperty("debug", "lib:Traveller")]
[h, if(debug == 1): broadcast("applyDamage Started")]

[h: jsonArgs = macro.args]
[h: oldInfo = json.get(jsonArgs, "old")]
[h: newInfo = json.get(jsonArgs, "new")]

[h: oldRound = json.get(oldInfo, "round")]
[h: newRound = json.get(newInfo, "round")]

[h: json = getInitiativeList()]
[h: tokens = json.get(json, "tokens")]
[h: len = json.length(tokens)]
[h: current = json.get(json, "current")]

[h: lastToken = len - 1]

[h: currentTokenId = json.get(newInfo, "token")]
[h: isNewRound = if(current == 0 && json.get(oldInfo, "offset") == lastToken, 1, 0)]

[h, if(oldRound != newRound || isNewRound == 1), code: {
    [h: args = json.append("[]", newInfo)]
    [h, macro("onNewRound@lib:Traveller"): args]
};{
    [h: ""]
}]

[h: args = json.append("[]", currentTokenId)]
[h: args = json.append(args, newRound)]
[h, macro("onActivation@lib:Traveller"): args]
