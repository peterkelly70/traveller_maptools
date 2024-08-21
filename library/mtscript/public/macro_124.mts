<!-- editInjury Macro -->
[h: debug("Edit Injury Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: injuryToEdit = arg(3)]

[h: injuryListJ = getLibProperty("injuryList", "lib:Traveller")]
[h: injuryDetails = json.get(injuryListJ, injuryToEdit)]
[h: debug("Injury Details Retrieved: " + json.indent(injuryDetails))]

<!-- Display fields for editing -->
[h: inputStr = "effect|"+json.get(injuryDetails, 0)+"|Effect|TEXT|WIDTH=20"]
[h: inputStr = listAppend(inputStr, "healed|"+json.get(injuryDetails, 1)+"|Healed|TEXT|WIDTH=20", "##")]
[h: inputStr = listAppend(inputStr, "medicalCheck|"+json.get(injuryDetails, 2)+"|Medical Check|TEXT|WIDTH=20", "##")]
[h: inputResult = input(inputStr)]

<!-- Check if the dialog was not cancelled -->
[h, if(inputResult != 0), code: {
    [h: updatedInjuryDetails = json.set("", "Effect", effect)]
    [h: updatedInjuryDetails = json.set(updatedInjuryDetails, "Healed", healed)]
    [h: updatedInjuryDetails = json.set(updatedInjuryDetails, "Medical Check", medicalCheck)]
    [h: injuryListJ = json.set(injuryListJ, injuryToEdit, updatedInjuryDetails)]
    [h: debug("Updated Injury Details: " + json.indent(updatedInjuryDetails))]
    [h: setLibProperty("injuryList", injuryListJ, "lib:Traveller")]
}]

<!-- Return to the character sheet -->
[h: debug("Edit Injury Stopped")]
[h: args = json.append("[]", callerID, tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]
