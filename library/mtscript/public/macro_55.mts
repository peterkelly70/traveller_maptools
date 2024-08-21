[h: debug("jsonView Started")]
[h: datadefns = getLibProperty("DataDef", "lib:Traveller")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: itemName = json.get(macro.args, 3)]
[h: jsonName = json.get(macro.args, 4)]

[h: debug("<pre>" + json.indent(macro.args) + "</pre>")]
[h: dataJ = getProperty(jsonName, callerID)]
[h: dataList = json.get(datadefns,jsonName)]
[h: debug("<pre> DataJ    ==> " + json.indent(dataJ) + "</pre>")]
[h: debug("<pre> DataList ==> " + json.indent(dataList) + "</pre>")]
[h: debug("<pre>"+itemName+" ==> </pre>")]
[h: itemList = json.fields(dataJ)]
[h: debug("<pre>"+itemList+"</pre>")]
[h: text = "<html>"]
[h: dataItem = json.get(dataJ, itemName)]
[h: debug("<pre>"+json.indent(dataItem)+"</pre>")]
[h, for(indexCount, 0, json.length(dataList)-1), code: {
   [h: dataName = json.get(dataList, indexCount)]
   [h: dataVal = json.get(dataItem, indexCount)]
   [h: debug("<pre>     " + dataName + ": "+dataVal+"</pre>")]
   [h: text = text + dataName + ": " + dataVal + "<br>"]
}]

[dialog(itemName): {
[r: text]
}]
[h: debug("jsonView Stopped")]





