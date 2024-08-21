[h: debug("Add Status Started")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
<!-- Define the dropdown options for duration (0-10 rounds) -->
[h: dropTen = "0,1,2,3,4,5,6,7,8,9,10"]
[h: statusArray = json.append("[]", "Dead", "Injured", "Bleeding", "Unconscious", "Incapacitated", "Stunned", "Panicked", "Blinded", "Deafened", "Drugged", "Poisoned", "Infected", "Fatigued", "Hot", "Cold", "Suffocating", "Radiated", "Sickness", "Hidden", "Prone")]
[h: statusesJ = getProperty("Statuses", callerID)]
[h: debug("Current Statuses JSON: " + json.indent(statusesJ))]

[h: iconList = ""]
[h: idxCount = 0]
[h, foreach(status, json.toList(statusArray)), code: {
    [h: icon = tblImage("StatusIcons", idxCount, 32)]
    [h: iconList = listAppend(iconList, status + " " + icon, ",")]
    [h: debug("<img src=" + icon + "></img>" + status)]
    [h: idxCount = idxCount + 1]
}]

<!-- Show the dropdown for selecting a status -->
[h: statusResult = input("statusDropdown|"+iconList+"|Select Status|LIST|VALUE=STRING ICON=TRUE ICONSIZE=32 DELIMITER=,")]
[h: debug("Initial Input Dialog Result: " + statusResult)]

<!-- Check if the first dialog was not cancelled -->
[h, if(statusResult != 0), code: {
	[h: debug("Proceesing for additional Data")]
    [h: debug("Status Dropdown: " + statusDropdown)]
    [h: dropIDX=listFind(iconList,statusDropdown)]
    [h: debug("DropIDX: " + dropIDX)]
    <!-- Get the selected status -->
    [h: selectedStatus = json.get(statusArray,dropIDX)]
    [h: debug("Status Selected: " + selectedStatus)]
    <!-- Update the Statuses -->
    [h: setState(selectedStatus,1,callerID)]
    [h: statusesJ = json.set(statusesJ, selectedStatus, 1)]  
    [h: debug("Updated Statuses JSON: " + json.indent(statusesJ))]
     
    <!-- Initialize additional input fields -->
    [h: additionalInput = ""]
   
    <!-- Add additional fields based on the selected status -->
    [h, switch(selectedStatus), code:
       case "Injured": {
          [h: injuryList = json.fields(getLibProperty("injuryList", "lib:Traveller"))]
          [h: debug("Injury List Retrieved: " + injuryList)]
          [h: additionalInput = "injuryDetails|"+injuryList+"|Select Injury|LIST|VALUE=STRING DELIMITER=,"]
       };
       case "Drugged": {
          [h: drugList = json.fields(getLibProperty("drugList", "lib:Traveller"))]
          [h: debug("Drug List Retrieved: " + drugList)]
          [h: additionalInput = "drugDetails|"+drugList+"|Select Drug|LIST|VALUE=STRING DELIMITER=,"]
       };
       case "Infected": {
          [h: infectionList = json.fields(getLibProperty("infectionList", "lib:Traveller"))]
          [h: debug("Infection List Retrieved: " + infectionList)]
          [h: additionalInput = "infectionDetails|"+infectionList+"|Select Infection|LIST|VALUE=STRING DELIMITER=,"]
       };
       case "Stunned": {
          [h: additionalInput = strformat("duration|%s|Duration (rounds)|LIST|SELECT=%d", dropTen, 0)]
          [h: debug("Stunned Duration Input Field Initialized")]
       };
       default: {
          [h: additionalInput = ""]
	}]
    [h: debug("Additional Input: " + additionalInput)]

    <!-- Show additional input dialog if needed -->
    [h: inputResult = 1] <!-- Assume input was successful -->
    [h, if(additionalInput != ""), code: {
       [h: statusResult = input(additionalInput)]
       [h: debug("Additional Input Dialog Result: " + statusResult)]
    }]
};{}]

<!-- Check if the second dialog was not cancelled -->
[h, if(statusResult != 0), code: {
	<!-- Initialize empty JSON objects for specific details -->
    [h: injuriesJ = getProperty("Injuries", callerID)]
    [h: drugsJ = getProperty("Drugs", callerID)]
    [h: infectionsJ = getProperty("Infections", callerID)]
    [h: debug("Initial Injuries JSON: " + json.indent(injuriesJ))]
    [h: debug("Initial Drugs JSON: " + json.indent(drugsJ))]
    [h: debug("Initial Infections JSON: " + json.indent(infectionsJ))]

    <!-- Handle the additional details -->
    [h, switch(selectedStatus), code:
    	case "Injured": {
           [h: injuryDetails = injuryDetails]
           [h: debug("Selected Injury Details: " + injuryDetails)]
           [h: injuriesJ = json.set(injuriesJ, selectedStatus, injuryDetails)]
           [h: debug("Updated Injuries JSON: " + json.indent(injuriesJ))]
        };
        case "Drugged": {
           [h: drugDetails = drugDetails]
           [h: debug("Selected Drug Details: " + drugDetails)]
           [h: drugsJ = json.set(drugsJ, selectedStatus, drugDetails)]
           [h: debug("Updated Drugs JSON: " + json.indent(drugsJ))]
        };  
        case "Infected": {
           [h: infectionDetails = infectionDetails]
           [h: debug("Selected Infection Details: " + infectionDetails)]
           [h: infectionsJ = json.set(infectionsJ, selectedStatus, infectionDetails)]
           [h: debug("Updated Infections JSON: " + json.indent(infectionsJ))]
         };
         case "Stunned": {
            [h: duration = number(get("duration"))]
            [h: debug("Stunned Duration Selected: " + duration)]
            [h: statusesJ = json.set(statusesJ, selectedStatus, duration)]
            [h: debug("Updated Statuses JSON with Stunned Duration: " + json.indent(statusesJ))]
         };
         default: {
         [h:dummy=""]
	    }]

        <!-- Set the state on the token -->
        [h: setState(selectedStatus, 1, callerID)]
        [h: debug("State Set for: " + selectedStatus)]

        <!-- Store the updated properties -->
        [h: setProperty("Statuses", statusesJ, callerID)]
        [h: setProperty("Injuries", injuriesJ, callerID)]
        [h: setProperty("Drugs", drugsJ, callerID)]
        [h: setProperty("Infections", infectionsJ, callerID)]
        [h: debug("Final Injuries JSON: " + json.indent(injuriesJ))]
        [h: debug("Final Drugs JSON: " + json.indent(drugsJ))]
        [h: debug("Final Infections JSON: " + json.indent(infectionsJ))]
};{}]

<!-- Return to the character sheet -->
[h: debug("Add Status Stopped")]
[h: args = json.append("[]", callerID, returnCall)]
[h, macro(returnCall + "@lib:Traveller"): args]
