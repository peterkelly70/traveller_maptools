[h: debug("editStats Start ")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: statsList = getLibProperty("statsList", "lib:Traveller")]

[h: inputFields = ""]  <!-- Initialize input fields -->
[h: statOptions = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"]  <!-- Define stat options -->

<!-- Generate strings for input() using the current property values -->
[h:inputStr=""]
[h: inputStr = listAppend(inputStr, "Label|Edit Stats||LABEL|","##")]
[h, foreach(stat, statsList), code: {
    [h: maxVal = getStat(callerID, stat, "max")]
    [h: curVal = getStat(callerID, stat, "cur")]
    [h: shortName = getPropertyDisplayName("Character", stat)]
    [h: debug("Shortname -> " + shortName)]

    [h: statLabel = strformat("%s|%s||LABEL|SPAN=TRUE", stat+"_label", stat)]
    [h: debug("Statlabel -> " + stat+"_label")]
    [h: inputField1 = strformat("%s_max|%s|<html><b>     Max</b></html>|LIST|SELECT=%s", stat, statOptions, maxVal)]
    [h: debug("IF1 -> " + inputField1)]
    [h: inputField2 = strformat("%s_cur|%s|<html><b>     Cur</b></html> |LIST|SELECT=%s", stat, statOptions, curVal)]
    [h: debug("IF2 -> " + inputField2)]
    
    [h: inputStr = listAppend(inputStr, statLabel, "##")]
    [h: inputStr = listAppend(inputStr, inputField1, "##")]
    [h: inputStr = listAppend(inputStr, inputField2, "##")]
}]

[h: debug("Final inputStr -> " + inputStr)]

<!-- Display input dialog to the user and handle the input -->
[h: inputResult = input(json.toList(inputStr, "##"))]
[h: debug("inputResult -> " + inputResult)]
[h, if (inputResult == 0), code: {
    [h: broadcast("Input was cancelled by the user.")]
    [h: abort(0)]
}]

[h, foreach(stat, statsList), code: {
    [h: maxVal = eval(string(stat + "_max"))]
    [h: curVal = eval(string(stat + "_cur"))]
    [h: setStat(callerID, stat, maxVal, "max")]
    [h: setStat(callerID, stat, curVal, "cur")]
}]
[h: debug("Stats updated for " + getName(callerID))]
[h: debug("editStats Stop ")]
<!-- manage return calls or further actions -->
[h: args = json.append("[]", callerID, returnTab)]
[macro(returnCall + "@lib:Traveller"): args]
