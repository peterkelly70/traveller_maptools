[h: debug("Get Status Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: targetID = arg(3)]
[h: status = arg(4)]

<!-- Define the dropdown options for duration (0-10 rounds) -->
[h: statusArray = json.append("[]", "Dead", "Injured", "Bleeding", "Unconscious", "Incapacitated", "Stunned", "Panicked", "Blinded", "Deafened", "Drugged", "Poisoned", "Infected", "Fatigued", "Hot", "Cold", "Suffocating", "Radiated", "Sickness", "Hidden", "Prone")]
[h: debug("Current Statuses JSON: " + json.indent(statusesJ))]
[h: statusesJ = json.get(statusesJ, status)]
[h: statusValue = getProperty("Statuses",statusesJ,callerID)]
[h: debug("State Value for: " + status + " is "+statusValue)]

<!-- Return to the character sheet -->
[h: debug("Get Status Stopped")]

<!-- Refresh the calling page -->
[macro.return = statusValue]


