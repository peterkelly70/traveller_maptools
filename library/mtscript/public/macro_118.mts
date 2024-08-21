[h: debug("Delete Status Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: statusToDelete = arg(3)]
[h: statusesJ = getProperty("Statuses", callerID)]
[h: debug("Current Statuses JSON: " + json.indent(statusesJ))]

<!-- Remove the status -->
[h: statusesJ = json.remove(statusesJ, statusToDelete)]
[h: debug("Updated Statuses JSON after deletion: " + json.indent(statusesJ))]

<!-- Clear the state on the token -->
[h: setState(statusToDelete, number(0), callerID)]
[h: debug("Cleared state for: " + statusToDelete)]

<!-- Save the updated statuses -->
[h: setProperty("Statuses", statusesJ, callerID)]
[h: debug("Statuses JSON saved.")]

<!-- Return to the character sheet -->
[h: args = json.append("[]", callerID, returnCall)]
[h, macro(returnCall + "@lib:Traveller"): args]
[h: debug("Delete Status Stopped")]
[h: args = json.append("[]",callerID,tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]