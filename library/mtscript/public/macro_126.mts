[h: debug("Add Infection Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
<!-- Define the dropdown options for duration (0-10 rounds) -->
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: infectionListJ = getLibProperty("infectionList","lib:Traveller")]
[h: injuriesP =  getProperty("Injuries",callerID)]
[h: debug("injurieList JSON: " + json.indent(infectionListJ))]
[h: debug("injuries: " + injuriesP))]

[h: iconList = ""]
[h: idxCount = 0]

[h: infectionList = json.fields(getLibProperty("infectionList", "lib:Traveller"))]
[h: debug("Infection List Retrieved: " + infectionList)]
[h: inputStr = "infectionAdded|"+infectionList+"|Select Infection|LIST|VALUE=STRING DELIMITER=,"]
[h: debug("inputStr: " + inputStr)]
[h: inputResult = input(inputStr)]
<!-- Check if the dialog was not cancelled -->
[h, if(inputResult != 0), code: {
    [h: injuriesP = addList(injuriesP, infectionAdded,1)]
    [h: debug("Updated Injuries JSON: " + injuriesP)]
    <!-- Store the updated properties -->
    [h: setProperty("Injuries", injuriesP, callerID)]
    [h: debug("Final Injuries List: " + injuriesP)]
}]

<!-- Return to the character sheet -->
[h: debug("Add Infection Stopped")]
[h, if(tabName != "None"), code: {
	[h: args = json.append("[]", callerID, tabName)]
	[h, macro(returnCall + "@lib:Traveller"): args]
};{
	[h: macro.return=inputResult]
}]

