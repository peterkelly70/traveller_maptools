[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("<pre>Start jsonAdd</pre>")]
<!-- Retrieve configuration and data definitions from library properties -->
[h: datadefns = getLibProperty("DataDef", "lib:Traveller")]
[h: broadcast("<pre>Recived ==> " + json.indent(macro.args) + "</pre>")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: returnTab = json.get(macro.args, 2)]
[h: jsonName = json.get(macro.args, 3)]
[h: baseJson = json.get(macro.args, 4)]
[h: applyFilter = json.get(macro.args, 5)]  <!-- New argument for filtering control -->

<!-- Retrieve the full list of possible entries from a base JSON -->
[h: fullList = getLibProperty(baseJson, "lib:Traveller")]

<!-- Retrieve the current list of entries from the specific character/user -->
[h: currentList = getProperty(jsonName, callerID)]

<!-- Extract all keys from the base JSON -->
[h: allKeys = json.fields(fullList)]

<!-- Optional filtering -->
[h: filteredKeys = json.set("{}","dummy","dummy")]
[h: filteredKeys = json.remove(filteredKeys,"dummy")]
[h, foreach(key, allKeys), code: {
    [h: includeKey = if(applyFilter == "true" && json.contains(currentList, key), false, true)]
    [h, if (includeKey), code:{
        [h: displayText = key]  <!-- Simplified to just use the key -->
        [h: filteredKeys = json.set(filteredKeys, key, displayText)]
    }]
}]

<!-- Convert filtered keys into a list for the dropdown -->
[h: dropdownList = json.toList(json.fields(filteredKeys), ",")]

<!-- Prepare the input dialog with a dropdown to select an entry -->
[h: inputStr = "[]"]
[h: inputStr = json.append(inputStr, "junk|Add " + returnTab + "|-|LABEL|SPAN=TRUE")]
[h: inputStr = json.append(inputStr, "selectEntry|" + dropdownList + "|Select Entry|LIST")]

[h, if (debug == 1):  broadcast("<pre>" + json.indent(inputStr) + "</pre>")]

<!-- Display input dialog to the user and handle the input -->
[h: inputResult = input(json.toList(json.evaluate(inputStr), "##"))]
[h, if (inputResult == 0), code:{
    [h: broadcast("Input was cancelled by the user.")]
    [r: abort(0)]
}]

<!-- Retrieve the selected entry from the input -->
[h, if (debug == 1): broadcast("<pre>" + selectEntry + "</pre>")]
[h: selectedKey = listGet(dropdownList, selectEntry)]
[h: selectedValues = json.get(fullList,selectedKey)]
[h, if (debug == 1):  broadcast("<pre>" + selectedKey +" ==> "+json.indent(selectedValues) + "</pre>")]

<!-- Update the properties based on user input and save them -->
[h: updatedList = json.set(currentList, selectedKey, selectedValues)]
[h, macro ("jsonSort@lib:Traveller"):updatedList]
[h: updatedList=macro.return]
[h: setProperty(jsonName, updatedList, callerID)]
[h, if (debug == 1): broadcast("<pre>Updated List: " + json.indent(updatedList) + "</pre>")]

[h, if (debug == 1): broadcast("<pre>Stop jsonAdd</pre>")]
<!-- Manage return calls or further actions -->
[h: args = json.append("[]", callerID, returnTab)]
[h, macro(returnCall + "@lib:Traveller"): args]
