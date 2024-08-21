[h: debug("<pre>setStat</pre>")]
[h: callerID = json.get(macro.args, 0)]
[h: stat = json.get(macro.args, 1)]
[h: valueToSet = number(json.get(macro.args, 2))]
[h: result = 0] <!-- Default result for success -->
<!-- Debugging: Start of macro -->
[h: debug("<pre>Start setStat for token: " + getName(callerID) + ", Stat: " + stat + ", Value to set: " + valueToSet + "</pre>")]

<!-- Determine if callerID is a PC and if a fourth argument was provided -->
[h: isPC = isPC(callerID)]
[h: argLength = json.length(macro.args)]

<!-- Debugging: Check if PC -->
[h: debug("<pre>Is PC: " + isPC + ", Argument Length: " + argLength + "</pre>")]

<!-- Check if caller is a PC and the required arguments (4th) are provided -->
[h, if(isPC && argLength > 3), code: {
    [h: state = json.get(macro.args, 3)]
    
    <!-- Debugging: State provided for PC -->
    [h: debug("<pre>State: " + state + "</pre>")]
    
    <!-- Validate if the state is either "max" or "cur" -->
    [h, if(state == "max" || state == "cur"), code: {
        [h: statJson = getProperty(stat, callerID)]
        [h: debug("<pre>Original Stat JSON: " + statJson + "</pre>")]
        
        [h: statJson = json.set(statJson, state, valueToSet)]
        [h: setProperty(stat, statJson, callerID)]
        
        <!-- Debugging: Updated Stat JSON -->
        [h: debug("<pre>Updated Stat JSON: " + statJson + "</pre>")]
    }; {
        [h: result = -1] <!-- Invalid state provided -->
        
        <!-- Debugging: Invalid state -->
        [h: debug("<pre>Invalid state provided: " + state + "</pre>")]
    }]
}; {
    <!-- Set the value directly for NPCs or if insufficient arguments for PCs -->
    [h: setProperty(stat, valueToSet, callerID)]
    
    <!-- Debugging: Value set directly for NPC or missing state -->
    [h: debug("<pre>Set stat directly for NPC or missing state. Stat: " + stat + ", Value: " + valueToSet + "</pre>")]
}]

<!-- Debugging: End of macro -->
[h: debug("<pre>End setStat. Result: " + result + "</pre>")]

[h: macro.return = result]
