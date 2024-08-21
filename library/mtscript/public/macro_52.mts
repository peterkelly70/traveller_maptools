[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("<pre>Start jsonDel</pre>")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabName = json.get(macro.args, 2)]
[h: itemName = json.get(macro.args, 3)]
[h: itemJsonName = json.get(macro.args, 4)]

[h: itemJ = getProperty(itemJsonName, callerID)]
[h: input = input(
"junkVar|"+itemName+"|Delete?|LABEL"
)]


[h: output = "Deletion cancelled."]
[h, if (input), code: {
        [h:itemJ = json.remove(itemJ,itemName)]
        [h:output=itemName+" deleted!"]
}]

[h: setProperty(itemJsonName, itemJ, callerID)]

[h: args = json.append("[]",callerID,output)]
[h, macro("say@lib:Traveller"):args]
[h, if (debug == 1): broadcast("<pre>Stop jsonDel</pre>")]

[h: args = json.append("[]",callerID,tabName)]
[h, macro(returnCall + "@lib:Traveller"): args]
