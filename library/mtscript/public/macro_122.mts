<!-- deleteInjury Macro -->
[h: debug("Delete Injury Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: injuryToDelete = arg(3)]

[h: injuriesP = getProperty("Injuries", callerID)]
[h: debug("Current Injuries: " + injuriesP)]

<!-- Remove the injury from the list -->
[h: injuriesP = listDelete(injuriesP, listFind(injuriesP, injuryToDelete))]
[h: debug("Updated Injuries after Deletion: " + injuriesP)]

<!-- Store the updated injuries list -->
[h: setProperty("Injuries", injuriesP, callerID)]

<!-- Return to the character sheet -->
[h: debug("Delete Injury Stopped")]
[h: args = json.append("[]", callerID, tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]
