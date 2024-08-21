[h: debug("Start char_skills")]
[h: callerID=json.get(macro.args,0)]
[h: returnCall="CharSheet"]
[h: impersonate(callerID)]

[h: baseJson = "skillList"]
[h: jsonName = "Skills"]
[h: tabReturn = "Skills"]
[h: filter = "false"]

[h: skillsJ = getProperty(jsonName,callerID)]

[h: addLink=makeLink(callerID,returnCall,"Add","jsonAdd@lib:Traveller",json.append("[]",tabReturn,jsonName,baseJson,filter),"plus")]]

<!-- Generate HTML content for Skills -->
[h: htmlContent = "<div class=section><div class=heading><h3>Skills</h3></div><table>"]
[h: row_class = "black"]
[h, foreach(skillName,json.fields(skillsJ)), code: {
  [h: skillLevel = json.get(json.get(skillsJ,skillName),0)]
  [h: debug("<pre>" + skillName + " ==> "+skillLevel+"</pre>")] 

  [h: itemName = skillName]
   
  [h: edLink=makeLink(callerID,returnCall,"Edit","editSkill@Lib:Traveller",json.append("[]",skillName,SkillLevel),"edit")]
  [h: delLink=makeLink(callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [h: viewLink=makeLink(callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [h: rollLink=makeLink(callerID,returnCall,"roll","rollSkill@Lib:Traveller",json.append("[]",skillName,skillLevel),"roll")]

    [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + skillName + "</td><td>"+skillLevel+"</td><td>" + edLink + delLink + viewLink + rollLink + "</td></tr>"]
    [h: row_class = if(row_class == "black", "white", "black")]
}]

[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink + "</div></div>"]
[h: debug("End char_skills")]
[h: macro.return = htmlContent] <!-- Return the HTML content -->

