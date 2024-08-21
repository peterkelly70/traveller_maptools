[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]

<!-- Step 1: Select Type -->
[h: input = input(
    "itemType|Equipment,Magazine|Select Item Type|LIST|VALUE=STRING|SELECT=0"
)]
[h: abort(input == 0)]  <!-- Abort if the dialog is cancelled -->


<!-- Populate the item name dropdown based on item type -->
[h, if(itemType == "Equipment"), code: {
    [h: items = getLibProperty("Equipment", "lib:Traveller")]
};{
    [h: items = getLibProperty("Weapons", "lib:Traveller")]
}]
[h: broadcast("<pre> "+json.indent(items)+"</pre>")]
[h: itemNamesList = ""]
[h, foreach(item, json.fields(items)), code: {
    [h: itemNamesList = listAppend(itemNamesList, item)]
}]
[h: itemNamesList = listSort(itemNamesList)]

<!-- Step 2: Input details for the selected item type -->
[h: input = input(
    "title|<html><div width=400><b>Add " + itemType + " Supply</b></div></html>|bar|LABEL|SPAN=TRUE",
    "itemName|" + itemNamesList + "|Item Name|LIST|VALUE=STRING",
    "itemCount|1,2,3,4,5,10,15,20|Count|LIST|VALUE=STRING|SELECT=0"
)]
[h: abort(input == 0)]  <!-- Abort if the dialog is cancelled -->

[h: itemName = getStrProp(inputStr, "itemName")]
[h: itemCount = getStrProp(inputStr, "itemCount")]

<!-- Determine item capacity based on type -->
[h, if(itemType == "Equipment"), code: {
    [h: itemCapacity = 1]
};{
    [h: itemDetails = json.get(items, itemName)]
    [h: itemCapacity = json.get(itemDetails, "Mag_Size", 1)]  <!-- Default to 1 if not found -->
}]

<!-- Combine the item details into a JSON object -->
[h: supplyItem = json.append("[]", 
    itemName,
    itemCount,
    itemCapacity,
    itemType
)]

[h: supplyJ = if(returnCall == "CharSheet", getProperty("Supplies", callerID), getProperty("supplyList", callerID))]
[h: supplyJ = json.append(supplyJ, supplyItem)]

<!-- Sort and save the updated supply list -->
[h: args = json.append("[]", supplyJ)]
[macro("jsonSort@lib:Traveller"): args]
[h: supplyJ = macro.return]

[h, if (returnCall == "CharSheet"), code: {
    [h: setProperty("Supplies", supplyJ, callerID)]
};{
    [h: setProperty("supplyList", supplyJ, callerID)]
}]

<!-- Notify the user and return to the previous dialog -->
[h: args = json.append("[]", callerID, "Added " + itemName)]
[macro("say@lib:Traveller"): args]

[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]
