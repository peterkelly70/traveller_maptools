[h: datadefns = getLibProperty("DataDef", "lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: itemName = json.get(macro.args, 3)]
[h: jsonName = json.get(macro.args, 4)]

[h: broadcast("<pre>" + json.indent(macro.args) + "</pre>")]
[h: dataJ = getProperty(jsonName, callerID)]
[h: dataList = json.get(datadefns,jsonName)]
[h: dataItem = json.get(dataJ, itemName)]

[h: inputText = "junk|Edit "+itemName+"|-|LABEL|SPAN=TRUE"]
[h, foreach(indexCount, 0, json.length(dataList)-1), code: {
   [h: dataName = json.get(dataList, indexCount)]
   [h: dataVal = json.get(dataItem, indexCount)]
   [h: inputPart = "var_" + indexCount + "|" + dataName + "|" + dataVal + "|TEXT"]
   [h: inputText = listAppend(inputText, inputPart, ",")]
}]

[h: inputText = substring(inputText, 0, length(inputText)-1)]
[h: broadcast("<pre>" + inputText + "</pre>")]

[h: input = input(inputText)]

[h, if (input), code: {
   [h: itemStats = json.append("", "")]
   [h: itemStats = json.remove(itemStats, 0)]
   [h, for(indexCount, 0, json.length(dataList)-1), code: {
      [h: dataName = json.get(dataList, indexCount)]
      [h: inputVarName = "var_" + indexCount]
      [h: inputVarValue = getStrProp(input, inputVarName)]
      [h: itemStats = json.set(itemStats, dataName, inputVarValue)]
   }]
   [h: dataJ = json.set(dataJ, itemName, itemStats)]
   [h: setProperty(jsonName, dataJ, callerID)]
}]

[h: args = json.append("[]",callerId,jsonName +" ==> "+itemName)]
[macro("say@lib:Traveller"):args]

[h: args = json.append("[]",callerID,returnCall,returnTab)]
[macro(returnCall + "@lib:Traveller"): args]






