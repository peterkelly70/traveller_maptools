[h: debug("Add Property List Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: status = arg(3)]
[h: statusList = arg(4)]

<!-- Define the dropdown options for duration (0-10 rounds) -->
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: listJ = getLibProperty(statusList,"lib:Traveller")]
[h: prop =  getProperty(status,callerID)]
[h: debug("List "+status+" JSON: " + json.indent(listJ))]
[h: debug(status+": " + prop))]

[h: iconList = ""]
[h: idxCount = 0]

[h: propList = json.fields(listJ)]
[h: debug("List Retrieved: " + propList)]
[h: inputStr = "statusAdded|"+propList+"|Select "+status+"|LIST|VALUE=STRING DELIMITER=,"]
[h: debug("inputStr: " + inputStr)]
[h: inputResult = input(inputStr)]
<!-- Check if the dialog was not cancelled -->
[h, if(inputResult != 0), code: {
    [h: prop = addList(prop, statusAdded,1)]
    [h: debug("Updated Property: " + prop)]
    <!-- Store the updated properties -->
    [h: setProperty(status, prop, callerID)]
}]

<!-- Return to the character sheet -->
[h: debug("Add Property LIst Stopped")]
[h, if(tabName != "None"), code: {
	[h: args = json.append("[]", callerID, tabName)]
	[h, macro(returnCall + "@lib:Traveller"): args]
};{
	[h: macro.return=inputResult]
}]

