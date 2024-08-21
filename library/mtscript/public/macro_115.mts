[h: debug = getState("Dead", "lib:Traveller")]  <!-- Set debug to the value of the DEAD state -->
[h: message = arg(0)] <!-- Retrieve the message passed to the macro -->

<!-- Check if debugging is enabled -->
[h, if(debug == 1): broadcast("<pre>Debug: " + message + "</pre>", "gm")]
