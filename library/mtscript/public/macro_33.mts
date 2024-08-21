[h: callerID=json.get(macro.args,0)]
[h: returnCall="AdminSheet"]
[h: impersonate(callerID)]
[h: skillsJ = getProperty("skilllist",callerID)]

[h: jsonName = "skillList"]
[h: tabReturn = "Skills"]

[h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,jsonName),"new")]
[macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]

<!-- Generate HTML content for Skills -->
[h: htmlContent = "<div class=section><div class=heading><h3>Skills</h3></div><table>"]
[h: row_class = "black"]
[h, foreach(skillName,json.fields(skillsJ)), code: {
  [h: skillLevel = json.get(json.get(skillsJ,skillName),0)]
  [h: broadcast("<pre>" + skillName + " ==> "+skillLevel+"</pre>")] 

  [h: itemName = skillName]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]

[h: args = json.append("[]", callerID,returnCall,"Edit","editSkill@Lib:Traveller",json.append("[]",skillName,skillLevel),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]


    [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + skillName + "</td><td>" + edLink + delLink + viewLink + "</td></tr>"]
    [h: row_class = if(row_class == "black", "white", "black")]
}]
[h: args = json.append("[]", callerID,"AdminSheet")]
[h: macroLink("Add", "addSkill@lib:Traveller", "none",args)]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink + "</div></div>"]
[h: macro.return = htmlContent] <!-- Return the HTML content -->

