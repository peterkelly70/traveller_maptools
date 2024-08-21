<!-- delete Macro -->
[h: debug("Delete Property List Started")]
[h: callerID = arg(0)]
[h: returnCall = arg(1)]
[h: tabName = arg(2)]
[h: ToDelete = arg(3)]
[h: status = arg(4)]
[h: statusList=arg(5)]
[h: debug("Delete "+status+" Started")]
[h: prop = getProperty(status, callerID)]
[h: debug("Current "+status+" ==> "+ prop)]

<!-- Remove the injury from the list -->
[h: prop = listDelete(prop, listFind(prop, ToDelete))]
[h: debug("Updated "+status+" after Deletion: " + prop)]

<!-- Store the updated injuries list -->
[h: setProperty(status, prop, callerID)]

<!-- Return to the character sheet -->
[h: debug("Delete Property List Stopped")]
[h: args = json.append("[]", callerID, tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]
