[h: callerID = json.get(macro.args,0)]
[h: impersonate(callerID)]
[h: statsList = getLibProperty("statsList","lib:Traveller")] 
[h: inputJSON = "{}"]
[h, foreach(stat, statsList), code: {
    [h: statJSON = getProperty(stat)]
    [h: maxVal = json.get(statJSON, "max")]
    [h: curVal = json.get(statJSON, "cur")]
    [h: inputJSON = json.set(inputJSON, stat + "_max", maxVal)]
    [h: inputJSON = json.set(inputJSON, stat + "_cur", curVal)]
}]
[h: processorLink = macroLinkText("update_stats@lib:Traveller", "all")]
[h: inputElements = "<form action='"+ processorLink + "' method='json'>"]
[h: inputElements = inputElements +  "<input type='hidden' name='callerID' value='" + callerID + "'>"]
[h: inputElements = inputElements + "<table class='section table'>"]
[h: inputElements = inputElements + "<tr class='tblhead'><th>Stat</th><th>Max</th><th>Current</th></tr>"]
[h, foreach(stat, statsList), code: {
    [h: maxVal = json.get(inputJSON, stat + "_max")]
    [h: curVal = json.get(inputJSON, stat + "_cur")]
    [h: inputElements = inputElements + "<tr class='white'><td>" + stat + "</td><td><input type='text' name='" + stat + "_max' value='" + maxVal + "' class='input-small'></td><td><input type='text' name='" + stat + "_cur' value='" + curVal + "' class='input-small'></td></tr>"]
}]
[h: inputElements = inputElements + "</table>"]
[h: inputElements = inputElements + "<div class='black center'><input class='submit-btn' type='submit' value='Update'></div>"]

[macro("CSS@lib:Traveller"): ""]
[h: css = macro.return]

[h: htmlContent = "
<html>
<head>
    <style type='text/css'>" + css + "</style>
    <title>Edit Statistics</title>
</head>
<body class='black'>
    <div class='section black'>
        <div class='heading'><h3>Statistics</h3></div>
        " + inputElements + "
    </div>
</body>
</html>
"]
[dialog5("edit_stats", "width=400; height=500; temporary=1; input=1; noframe=1"): {[r: htmlContent]}]
