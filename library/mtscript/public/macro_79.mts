[h: callerID = arg(0)
[h: lsVisibleNpc = json.intersection( getNPCNames("json"), getVisibleTokenNames("json") )]

[h: assert(json.length(lsVisibleNpc), "No visible NPC", 0)]

[h: input("index|"+json.toList(lsVisibleNpc)+"|My target is|LIST") ]

// Retrieve the first element, so we only get the name (and not ["name"])
[h: currentTgt = json.get(lsVisibleNpc, index) ]

// Display message to be sure of what has just been done
Current target : {currentTgt}