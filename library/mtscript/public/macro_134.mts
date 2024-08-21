[h: debug("Set Status Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: targetID = arg(3)]
[h: status = arg(4)]
[h: statusValue = arg(5)]
[h: val = if(statusValue==0,0,1)]
<!-- Define the dropdown options for duration (0-10 rounds) -->
[h: statusArray = json.append("[]", "Dead", "Injured", "Bleeding", "Unconscious", "Incapacitated", "Stunned", "Panicked", "Blinded", "Deafened", "Drugged", "Poisoned", "Infected", "Fatigued", "Hot", "Cold", "Suffocating", "Radiated", "Sickness", "Hidden", "Prone")]
[h: statusesJ = getProperty("Statuses", callerID)]
[h: debug("Current Statuses JSON: " + json.indent(statusesJ))]
[h: statusesJ = json.set(statusesJ, status, statusValue)]
[h: setProperty("Statuses",statusesJ,callerID)]
[h: setState(status, val, callerID)]
[h: debug("State("+val+") Set for: " + status)]

<!-- Return to the character sheet -->
[h: debug("Set Status Stopped")]

<!-- Refresh the calling page -->
[h, if(tabName != "None"), code: {
    [h: args = json.append("[]", callerID, tabName)]
    [macro(returnCall + "@lib:Traveller"): args]
};{
    [macro.return = 1]
}]

