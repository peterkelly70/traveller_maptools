[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "AdminSheet"]

[h: jsonName = "equipmentList"]
[h: tabReturn = "Equipment"]

[h: equipmentJ = getProperty(jsonName, callerID)]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Equipment</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

[h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@lib:Traveller",json.append("[]",tabReturn,jsonName),"edit")]
[macro("makeLink@Lib:Traveller"): args]
[h: editLink=macro.return]

[h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,jsonName),"new")]
[macro("makeLink@Lib:Traveller"): args]
[h: newLink=macro.return]


[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Name</th><th>TL</th><th>Description</th><th>Traits</th><th></th></tr>"]
[h: doc="Name{TL-0,weight-1,cost-2,description-3,traits-4}"]
[h, foreach(equipmentType, equipmentJ), code: {
  [h: equipmentInfo = json.get(equipmentJ, equipmentType)]
  [h: TL = json.get(equipmentInfo, 0)]
  [h: weight = json.get(equipmentInfo, 1)]
  [h: cost = json.get(equipmentInfo, 2)]
  [h: description = json.get(equipmentInfo, 3)]
  [h: eqTraits = json.get(equipmentInfo, 4)]
 
  [h: itemName = equipmentType]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + equipmentType + "</td><td>" + TL + "</tr><td>" + description + "</td><td>" + eqTraits + "</td><td>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,jsonName),"new")]
[macro("makeLink@Lib:Traveller"): args]
[h: newLink=macro.return]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + newLink + "</div></div>"]



[h: macro.return = htmlContent]
