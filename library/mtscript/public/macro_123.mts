<!-- viewInjury Macro -->
[h: debug("View Injury Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: injuryToView = arg(3)]

[h: injuryListJ = getLibProperty("injuryList", "lib:Traveller")]
[h: injuryDetails = json.get(injuryListJ, injuryToView)]
[h: debug("Injury Details Retrieved: " + json.indent(injuryDetails))]

<!-- Display injury details -->
[h: inputStr = "injuryDetails|"+json.toList(injuryDetails, "||")+"|"+injuryToView+"|LABEL|SPAN=TRUE"]
[h: inputResult = input(inputStr)]

<!-- Return to the character sheet -->
[h: debug("View Injury Stopped")]
[h: args = json.append("[]", callerID, tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]