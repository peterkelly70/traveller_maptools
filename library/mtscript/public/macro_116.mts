[h: debug("Add Status Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
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
       	[h: args=json.append(callerID, returnCall,"None","Injuries","injuryList")]
        [h, macro("addPropList@lib:Traveller"): args]
        [h: statusResult=macro.return]
       };
       case "Drugged": {
       	[h: args=json.append(callerID, returnCall,"None","Drugs","drugList")]
        [h, macro("addPropList@lib:Traveller"): args]
        [h: statusResult=macro.return]
       };
       case "Infected": {
       	[h: args=json.append(callerID, returnCall,"None","Infections","infectionList")]
        [h, macro("addPropList@lib:Traveller"): args]
        [h: statusResult=macro.return]
       };
       case "Stunned": {
        [h: debug("Get Stunned Duration")]
		[h: inputStr = strformat("duration|%s|Duration (rounds)|LIST|SELECT=%d", dropTen, 0)]
        [h: statusResult=input(inputStr)]
       };
       case "Blinded": {
        [h: debug("Get Blinded Duration")]
		[h: inputStr = strformat("duration|%s|Duration (rounds)|LIST|SELECT=%d", dropTen, 0)]
        [h: statusResult=input(inputStr)]
       };
       case "Deafened": {
        [h: debug("Get Defened Duration")]
		[h: inputStr = strformat("duration|%s|Duration (rounds)|LIST|SELECT=%d", dropTen, 0)]
        [h: statusResult=input(inputStr)]
       };
       default: {
          [h: additionalInput = ""]
	}]
}]

<!-- Check if the second dialog was not cancelled -->
[h, if(statusResult != 0), code: {
	<!-- Initialize empty JSON objects for specific details -->
    <!-- Handle the additional details -->
    [h, switch(selectedStatus), code:
         case "Stunned": {
            [h: stateValue = number(duration))]
            [h: debug("Stunned Duration: " + duration)]
         };
         default: {
            [h:stateValue=number(1)]
	    }]
        <!-- Set the state on the token -->
        [h: statusesJ = json.set(statusesJ, selectedStatus, stateValue)]
        [h: setProperty("Statuses",statusesJ,callerID)]
        [h: setState(selectedStatus, 1, callerID)]
        [h: debug("State Set for: " + selectedStatus)]
}]

<!-- Return to the character sheet -->
[h: debug("Add Status Stopped")]
[h: args = json.append("[]", callerID, tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]
