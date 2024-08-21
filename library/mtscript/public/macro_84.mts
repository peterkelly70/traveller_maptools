[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: stat = json.get(macro.args, 3)]
[h: statsList = getLibProperty("statsList", "lib:Traveller")]

[h: inputFields = ""]  <!-- Initialize input fields -->
[h: statOptions = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"]  <!-- Define stat options -->

<!-- Generate strings for input() using the current property values -->
[h: inputStr = "[]"]
[h: statJSON = getProperty(stat, callerID)]
[h: maxVal = json.get(statJSON, "max")]
[h: curVal = json.get(statJSON, "cur")]
[h: shortName = getPropertyDisplayName("Character", stat)]
[h: inputField0 = strformat("tab%s|%s||TAB",shortName,shortName)]
[h: inputField1 = "bar|<html><div width=200><HR></div></html>|bar|LABEL|span=true"]
[h: inputField2 = strformat("%s|%s|%s|LIST|SELECT=%s", shortName+"_max",statOptions, "Max",maxVal)]
[h: inputField3 = strformat("%s|%s|%s|LIST|SELECT=%s", shortName+"_cur",statOptions, "Current",curVal)]
[h: inputStr = json.append(inputStr, inputField0,inputField1,inputField2,inputField3)]

<!-- Display input dialog to the user and handle the input -->
[h: inputResult = input(json.toList(json.evaluate(inputStr), "##"))]
[h, if (inputResult == 0), code:{
    [h: broadcast("Input was cancelled by the user.")]
    [h: abort(0)]
}]

[h: shortName = getPropertyDisplayName("Character", stat)]
[h: maxVal = eval(string(shortName + "_max"))]
[h: curVal = eval(string(shortName + "_cur"))]
[h: statJSON = getProperty(stat, callerID)]
[h: statJSON = json.set(statJSON, "max", maxVal)]
[h: statJSON = json.set(statJSON, "cur", curVal)]
[h: setProperty(stat, statJSON, callerID)]

<!-- manage return calls or further actions -->
[h: args = json.append("[]", callerID,returnTab)]
[macro(returnCall + "@lib:Traveller"): args]