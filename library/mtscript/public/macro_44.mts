[h: debug("<pre>getStat Started</pre>")]
[h: callerID = arg(0)]
[h: stat = arg(1)]
[h: val = -1] <!-- Default value in case of missing arguments or invalid state -->
[h: debug("<pre>Stat:"+stat+"</pre>")]
<!-- Determine if callerID is a PC and if a third argument was provided -->
[h: isPC = isPC(callerID)]
[h: argLength = json.length(macro.args)]

[h, if(json.length(macro.args)>2), code: {
    [h: state = json.get(macro.args, 2)]
    [h: debug("<pre>State:"+state+"</pre>")]
    <!-- Validate if the state is either "max" or "cur" -->
    [h, if(state == "max" || state == "cur"), code: {
    	[h: debug("<pre>"+json.indent(getProperty(stat, callerID))+"</pre>")]
        [h: val = number(json.get(getProperty(stat, callerID), state))]
    }]
}; {
    [h: val = number(getProperty(stat, callerID))]
}]
[h: debug("<pre>End getStat. Result: " + val + "</pre>")]
[h: macro.return = val]
