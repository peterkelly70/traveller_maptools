<!-- Retrieve configuration and data definitions from library properties -->
[h: debug("<pre>Start jsonNew</pre>")]
[h: datadefns = getLibProperty("DataDef", "lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: jsonName = json.get(macro.args, 3)]

<!-- set varibles -->
[h: debug("<pre>" + json.indent(macro.args) + "</pre>")]

[h: dataJ = getProperty(jsonName, callerID)]
[h: dataList = json.get(datadefns, jsonName)]
<!--  -->
[h: itemVars = "{}"]
[h, for(index, 0, json.length(dataList)-1), code: {
    [h: varName = json.get(dataList, index)]
    [h: itemValue = varName]
   	[h: debug("<pre> " + varName + " ==> "+itemValue+"</pre>")]
    [h: itemVars = json.set(itemVars, varName, itemValue)]
}]

<!-- Generate strings for input() using the current property values -->
[h: inputStr = "[]"]
[h: inputField = strformat("junk|New "+jsonName+"|-|LABEL|SPAN=TRUE")]
[h: inputStr = json.append(inputStr,inputField)]
[h: inputField = strformat("%s|%s|%s|TEXT", "itemName", "Value", "Name")]
[h: inputStr = json.append(inputStr, inputField)]
[h, for(index, 0, json.length(dataList)), code: {
	[h: varName = json.get(dataList, index)]
    [h: varValue = varName)]
    [h: inputField = strformat("%s|%s|%s|TEXT", "nu_"+varName, varValue, varName)]
    [h: inputStr = json.append(inputStr, inputField)]
}]

[h: debug("<pre> " + inputStr + "</pre>")]

<!-- Display input dialog to the user and handle the input -->
[h: inputResult = input(json.toList(json.evaluate(inputStr), "##"))]
[h, if (inputResult == 0), code:{
    [h: debug("Input was cancelled by the user.")]
    [r: abort(0)]
}]

<!-- Update the properties based on user input and save them -->
[h: dataItem = json.append("[]","")]
[h: dataItem = json.remove(dataItem,0)]
[h, for(index, 0, json.length(dataList)), code: {
	[h: inputVarName = json.get(dataList, index)]
    [h: inputVarValue = string(eval("nu_"+inputVarName))]
    [h: debug("<pre> " + inputvarName + " ==> "+ inputVarValue +"</pre>")]
    [h: dataItem = json.append(dataItem, inputVarValue)]
}]

<!-- Save the updated data back to the property -->
[h: debug("<pre> " + dataItem +"</pre>")]
[h: dataJ = json.set(dataJ, itemName, dataItem)]
[h: debug("<pre>" + json.indent(dataJ) + "</pre>")]

[h: args = json.append("[]",dataJ)]
[h, macro("jsonSort@lib:Traveller"): args]
[h: dataJ = macro.return]

[h: setProperty(jsonName, dataJ, callerID)]

[h: debug("<pre>Stop jsonNew</pre>")]
<!-- manage return calls or further actions -->
[h: args = json.append("[]", callerID,returnTab)]
[h, macro(returnCall + "@lib:Traveller"): args]
