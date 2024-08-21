<!-- Retrieve configuration and data definitions from library properties -->
[h: callerID = json.get(macro.args, 0)]
[h: jsonName = json.get(macro.args, 1)]
[h: baseJson = json.get(macro.args, 2)]
[h: source = json.get(macro.args, 3)]
[h: applyFilter = json.get(macro.args, 4)]  <!-- New argument for filtering control -->

<!-- Retrieve the full list of possible entries from a base JSON -->
[h, if(source == "lib"), code: {
   [h: fullList = getLibProperty(baseJson, "lib:Traveller")]
};{
   [h: fullList = getProperty(baseJson, callerID)]
}]


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

[h: macro.return = dropdownList]
