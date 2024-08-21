[h: callerID="B31CE5ED488E4CB79DA0781DF31950AD"]
[h: inputJson =  arg(0)]
[h: sortON =  arg(1)]
[h: sortedJson = "{}"]

<!-- Display unsorted JSON -->
[h: broadcast("<pre>JSON UNSORTED >> " + json.indent(inputJson) + "</pre>")]

<!-- Sort keys and process each one -->
<!-- switch for sortON -->
<!-- options are key,1st,2nd,3rd,4th,5th  -->
<!-- so for example i have jspom tha look slike this "alfred":["32","mouse"],"Tyresse":["23","goose"]  -->
<!-- I should be able to sort on the key, opr on the age, or favourte animsl (key,one,two)  -->
<!-- Also though I might get a josn like this "Jack":20,"Fillon":10 - in which case I wnat be able sort on the name or teh distance (key,one)-->
<!--  -->
[h: keys = listSort(json.fields(inputJson),"A+")]

[h: message="JSON KEYS >> " + keys]
[h: broadcast("<pre>" + message + "</pre>")]


[h, foreach(key, keys), code: {
    [h: value = json.get(inputJson, key)]
    [h: sortedJson = json.set(sortedJson, key, value)]
    
    <!-- Display processing of each key -->
    [h: message="Processing >> " + key + ":" + value ]
    [h: broadcast("<pre>" + message + "</pre>")]
}]

<!-- Display sorted JSON -->
[h: message="JSON SORTED >> " + json.indent(sortedJson)]
[h: broadcast("<pre>" + message + "</pre>")]

[h: macro.return = sortedJson]
