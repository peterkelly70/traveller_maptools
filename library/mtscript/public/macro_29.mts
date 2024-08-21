[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("jsonSort Started")]
[h: callerID="B31CE5ED488E4CB79DA0781DF31950AD"]
[h: inputJson =  arg(0)]
[h: sortedJson = "{}"]

[h, if (debug == 1): broadcast("<pre>JSON UNSORTED >> " + json.indent(inputJson) + "</pre>")]
<!-- Sort keys and process each one -->

[h: keys = listSort(json.fields(inputJson),"A+")]

[h, if (debug == 1): broadcast("<pre>KEYS SORTED >> "+ keys + "</pre>")]

[h, foreach(key, keys), code: {
    [h: value = json.get(inputJson, key)]
    [h: sortedJson = json.set(sortedJson, key, value)]}]

<!-- Display sorted JSON -->
[h, if (debug == 1): broadcast("<pre>JSON SORTED >> " + json.indent(sortedJson) + "</pre>")]
[h, if (debug == 1): broadcast("jsonSort Stopped")]
[h: macro.return = sortedJson]
