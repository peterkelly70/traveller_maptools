[h: callerID=json.get(macro.args,0)]
[h: returnCall="CharSheet"]
[h: tabReturn = "Statistics"]
[h: statsL = getLibProperty("statsList","lib:Traveller")]
[h: debug("<pre>Stats ==> " + statsL + "</pre>")]


[h: htmlContent = "<div class=section><div class=heading><h3>Statistics</h3></div><table>"]
[h: row_class = "white"]
[h: htmlContent = htmlContent +"<tr class='tblhead'><th class='stat-name'>Stat</th><th class='cur'>Cur</th><th class='seperator'></th><th  class='max'>Max</th><th class='dm'>DM</th><th></th></tr>"]
<!-- Loop through each statistic to get the property and modifier -->
[h, foreach(stat, statsL), code: {
    [h: statJ = getProperty(stat,callerID)] 
    [h: debug("<pre>Stat("+stat+") ==> " + json.indent(statJ) + "</pre>")]
    [h: statMax = getStat(callerID,stat,"max")] 
    [h: statCur = getStat(callerID,stat,"cur")] 
    [h: statDM = getStatDM(statCur)]
    [h: edLink=makeLink(callerID,returnCall,"Edit","statEdit@Lib:Traveller",json.append("[]",tabReturn,stat,"roll"),"edit")]
    [h: rollLink=makeLink(callerID,returnCall,"Roll","rollStat@Lib:Traveller",json.append("[]",tabReturn,stat,"roll"),"roll")]
    [h: links = edLink+rollLink]
    [h: htmlContent = htmlContent + "<tr class='"+row_class+"'><td>" + stat + ":</td><td class='center'>" + statCur + "</td><td class='center'>/</td><td class='center'>" + statMax + "</td><td class='center'>(" + statDM + ")</td><td>"+links+"</td></tr>"]
    [h: row_class = if(row_class == "black", "white", "black")]
}]

[h: editSectionLink = makeLink(callerID,returnCall,"Edit","editStats@lib:Traveller",json.append("[]",tabReturn),"edit")]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + editSectionLink + "</div></div>"]

[h: macro.return = htmlContent]  <!-- Return the HTML content -->

