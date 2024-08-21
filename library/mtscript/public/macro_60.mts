[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("<pre>Start jsonEdit</pre>")]
<!-- Retrieve configuration and data definitions from library properties -->
[h: datadefns = getLibProperty("DataDef", "lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: itemName = json.get(macro.args, 3)]
[h: jsonName = json.get(macro.args, 4)]

<!-- set varibles -->
[h: broadcast("<pre>" + json.indent(macro.args) + "</pre>")]

[h: dataJ = getProperty(jsonName, callerID)]
[h: dataList = json.get(datadefns, jsonName)]
[h: dataItem = json.get(dataJ, itemName)]

<!--  -->
[h: itemVars = "{}"]
[h, for(index, 0, json.length(dataList)), code: {
    [h: itemValue = json.get(dataItem, index)]
    [h: varName = json.get(dataList, index)]
   	[h, if (debug == 1): broadcast("<pre> " + varName + " ==> "+itemValue+"</pre>")]
    [h: itemVars = json.set(itemVars, varName, itemValue)]
}]

<!-- Generate strings for input() using the current property values -->
[h: inputStr = "[]"]
[h: inputStr = json.append(inputStr,"junk|Edit " + itemName + "|-|LABEL|SPAN=TRUE")]
[h, for(index, 0, json.length(dataList)), code: {
	[h: varName = json.get(dataList, index)]
    [h: varValue = json.get(dataItem, index)]
    [h: inputField = strformat("%s|%s|%s|TEXT", "nu_"+varName, varValue, varName)]
    [h: inputStr = json.append(inputStr, inputField)]
}]

[h, if (debug == 1): broadcast("<pre> " + inputStr + "</pre>")]

<!-- Display input dialog to the user and handle the input -->
[h: inputResult = input(json.toList(json.evaluate(inputStr), "##"))]
[h, if (inputResult != 0), code:{
   <!-- Update the properties based on user input and save them -->
   [h: dataItem = json.append("[]","")]
   [h: dataItem = json.remove(dataItem,0)]
   [h, for(index, 0, json.length(dataList)), code: {
      [h: inputVarName = json.get(dataList, index)]
      [h: inputVarValue = string(eval("nu_"+inputVarName))]
      [h, if (debug == 1):  broadcast("<pre> " + inputvarName + " ==> "+ inputVarValue +"</pre>")]
      [h: dataItem = json.append(dataItem, inputVarValue)]
   }]
   <!-- Save the updated data back to the property -->
   [h, if (debug == 1):  broadcast("<pre> " + dataItem +"</pre>")]
   [h: dataJ = json.set(dataJ, itemName, dataItem)]
   [h, if (debug == 1):  broadcast("<pre>" + json.indent(dataJ) + "</pre>")]
}]

[h, if (inputResult == 0), code:{
    [h, if (debug == 1):  broadcast("Input was cancelled by the user.")]
}]
    


[h: args = json.append("[]",dataJ)]
[h, macro("jsonSort@lib:Traveller"): args]
[h: dataJ = macro.return]


[h: setProperty(jsonName, dataJ, callerID)]

[h, if (debug == 1): broadcast("<pre>Stop jsonEdit</pre>")]
<!-- manage return calls or further actions -->
[h: args = json.append("[]", callerID,returnTab)]
[h, macro(returnCall + "@lib:Traveller"): args]
