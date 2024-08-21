[h: callerID = json.get(macro.args, 0)]
[h: impersonate(callerID)]
[h: statsList = getLibProperty("statsList", "lib:Traveller")] 
[h: inputJSON = "{}"]
[h, foreach(stat, statsList), code: {
    [h: statJSON = getProperty(stat, callerID)]
    [h: maxVal = json.get(statJSON, "max")]
    [h: curVal = json.get(statJSON, "cur")]
    [h: inputJSON = json.set(inputJSON, stat + "_max", maxVal)]
    [h: inputJSON = json.set(inputJSON, stat + "_cur", curVal)]
}]
[h: processorLink = macroLinkText("update_stats@lib:Traveller", "all")]
[h: inputElements = "<form action='" + processorLink + "' method='json'>"]
[h: inputElements = inputElements + "<input type='hidden' name='callerID' value='" + callerID + "'>"]
[h: inputElements = inputElements + "<table class='stats-edit-table'>"]
[h: inputElements = inputElements + "<tr class='tblhead'><th>Stat</th><th>Max</th><th>Current</th></tr>"]
[h, foreach(stat, statsList), code: {
    [h: maxVal = json.get(inputJSON, stat + "_max")]
    [h: curVal = json.get(inputJSON, stat + "_cur")]
    [h: inputElements = inputElements + "<tr class='white'><td class='stat-name'>" + stat + "</td><td><input type='text' name='" + stat + "_max' value='" + maxVal + "' class='stats-edit-input-small'></td><td><input type='text' name='" + stat + "_cur' value='" + curVal + "' class='stats-edit-input-small'></td></tr>"]
}]
[h: inputElements = inputElements + "</table>"]
[h: inputElements = inputElements + "<div class='stats-edit-center'><input class='stats-edit-submit-btn' type='submit' value='Update'></div>"]
[h: inputElements = inputElements + "</form>"]

[macro("CSS@lib:Traveller"): ""]
[h: css = macro.return + "
/* Insert the additional CSS for the stats edit page here */
.stats-edit-body {
    font-family: Arial, sans-serif;
    background-color: black;
    color: white;
    margin: 0;
    padding: 20px;
}

.stats-edit-heading {
    padding-left: 10px;
    padding-right: 10px;
    display: block;
    background-color: black;
    color: red;
    font-size: 16px;
}

.stats-edit-section {
    padding: 2px;
    border: 2px solid black;
    background-color: white;
    color: black;
    margin-bottom: 20px;
    width: 100%;
}

.stats-edit-scrollable {
    max-height: 500px;
    overflow-y: auto;
}

.stats-edit-table {
    width: 100%;
    border-collapse: collapse;
}

.stats-edit-table th, .stats-edit-table td {
    border: 1px solid #555;
    padding: 8px;
    text-align: center;
}

.stats-edit-table th {
    background-color: #4CAF50;
    color: white;
}

.stats-edit-table tr:nth-child(even) {
    background-color: #222;
}

.stats-edit-table tr:hover {
    background-color: #333;
}

.stats-edit-input-small {
    width: 60px;
    padding: 5px;
    margin: 5px 0;
    box-sizing: border-box;
    background-color: #333;
    color: #ddd;
    border: 1px solid #555;
}

.stats-edit-submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

.stats-edit-submit-btn:hover {
    background-color: #45a049;
}

.stats-edit-center {
    text-align: center;
}
"]

[h: htmlContent = "
<html>
<head>
    <style type='text/css'>" + css + "</style>
    <title>Edit Statistics</title>
</head>
<body class='stats-edit-body'>
    <div class='stats-edit-section'>
        <div class='stats-edit-heading'><h3>Edit Statistics</h3></div>
        <div class='stats-edit-scrollable'>
        " + inputElements + "
        </div>
    </div>
</body>
</html>
"]
[dialog("edit_stats", "width=600; height=700; temporary=1; input=1; noframe=1; resizable=1; scrollbars=1"): {[r: htmlContent]}]

