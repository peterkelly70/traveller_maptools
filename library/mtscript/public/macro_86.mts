<!-- Character Activated -->
[h: debug = getLibProperty("debug", "lib:Traveller")]
[h, if(debug == 1): broadcast("onActovation Started")]
[h: currentToken = arg(0)]
[h, if(debug == 1): broadcast("<pre>Token: "+getName(currentToken)+"</pre>")]
[h: newRound = arg(1)]
[h, if(debug == 1): broadcast("<pre>Newround: "+json.indent(newRound)+"</pre>")]
<!-- reset reaction count, and combat modifers -->
<!-- -->
<!-- get token statuses,  apply, reduce riund counr -->
