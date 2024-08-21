[h: debug("<pre>Start Say</pre>")]
[h: callerID = arg(0)]
[h: message = arg(1)]
[h: tokenName = getName(callerID)]
[token(callerID), code: {
   [h: debug("<pre>"+message+"</pre>")]
   [r:message]
}]
[h: debug("<pre>End Say</pre>")]
