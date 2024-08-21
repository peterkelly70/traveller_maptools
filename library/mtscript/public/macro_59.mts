[h: debug("<pre>Admin_Test</pre>")]
[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "AdminSheet"]

[r: say(callerID,"Testing UDF for say")]

<!-- Get all token names on the current map -->
[h: tokenIDs = getTokens()]
[h: debug("<pre>Tokens Found: " + tokenIDs + "</pre>")]

<!-- Loop through each token by its ID -->
[h, foreach(tokenID, tokenIDs), code: {

    <!-- Get the name of the current token by ID -->
    [h: tokenName = getName(tokenID)]
    
    <!-- Construct the message for the current token -->
    [h: msg = tokenName + " checking in"]
    <!-- Pass the message to the say routine, ensuring the correct token is impersonated -->
    [r: say(tokenID, msg)]

    <!-- Debug output to verify each token impersonation -->
    [h:debug("<pre>Impersonated: " + getName(getImpersonated()) + "</pre>")]
}]
[h: propertyName = "injuryList"]  <!-- Replace with the property you want to test -->
[h: itemName = "Broken Arm"]  <!-- Replace with the item you want to check -->

[h: propertyValue = getLibProperty(propertyName, "lib:Traveller")]

[h: htmlContent = ""]

[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Test Output</h3></div><table class='scrollable'>"]

[h: testOutput = "<pre>Property Value for '" + propertyName + "' is: " + json.indent(propertyValue) + "</pre>"]
[h: htmlContent = htmlContent + "<tr><td colspan='2'>" + testOutput + "</td></tr>"]

[h: itemInfo = json.get(propertyValue, itemName)]
[h: itemOutput = "Item Info for '" + itemName + "' is: " + json.indent(itemInfo)]

[h: htmlContent = htmlContent + "<tr><td>" + itemName + "</td><td>" + itemOutput + "</td></tr>"]

[h: htmlContent = htmlContent + "</table></div>"]

[h: macro.return = htmlContent]
