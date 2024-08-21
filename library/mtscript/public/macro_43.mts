[h: formData = macro.args]  <!-- Directly using the passed arguments as form data -->
[r: "Form Data Received: " + formData]  <!-- Output received form data for debugging -->
[h: callerID = json.get(formData, "callerID")]  <!-- Extracting the callerID from the form data -->
[r: "Caller ID: " + callerID]  <!-- Debugging output for callerID -->

[h: statsList = getLibProperty("statsList","lib:Traveller")] 
[h: errorFlag = 0]
[h: errorMsg = ""]


[h, foreach(stat, statsList), code: {
    [h: statMax = json.get(formData, stat+"_max")] 
    [h: statCur = json.get(formData, stat+"_cur")] 
	[h: newStatJSON = json.set("{}", "max", statMax, "cur", statCur)]
    [h: setProperty(stat, newStatJSON)]
    [r: "Updated " + stat + ":"+newStatJSON]  
}]


[h:tab="Statistics"]
[h: args = json.append("[]",callerID,tab)]
[macro("CharSheet@Lib:Traveller"): args]
[abort(0)]A
