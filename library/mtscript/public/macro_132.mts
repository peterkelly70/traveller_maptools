[h: debug("<pre>Start Popup</pre>")]
[h: callerID = arg(0)]
[h: message = arg(1)]
[h: tokenName = getName(callerID)]

[token(callerID), code: {
    [h: debug("<pre>"+message+"</pre>")]
    
    [h: dialog("Information from " + tokenName) {
        "<html>
        <body>
        <p>" + message + "</p>
        <p><input type='button' value='OK' onclick='closeDialog()'></p>
        </body>
        </html>"
    }]
}]

[h: debug("<pre>End Popup</pre>")]