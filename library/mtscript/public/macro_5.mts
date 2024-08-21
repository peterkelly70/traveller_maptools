[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "CharSheet"]

[h: baseJson = "equipmentList"]
[h: jsonName = "Equipment"]
[h: tabReturn = "Equipment"]
[h: filter = "false"]

[h: equipmentJ = getProperty(jsonName, callerID)]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>"+tabReturn+"</h3></div><table class='scrollable'>"]
[h: row_class = "white"]


[h: args = json.append("[]", callerID,returnCall,"Add","jsonAdd@lib:Traveller",json.append("[]",tabReturn,jsonName,baseJson,filter),"plus",32)]
[h, macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]


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
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + equipmentType + "</td><td>" + TL + "</tr><td>" + description + "</td><td>" + eqTraits + "</td><td>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink + "</div></div>"]


[h: jsonName = "Supplies"]
[h: supplyJ = getProperty(jsonName,callerID)]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Supply</h3></div><table class='scrollable'>"]
[h: row_class = "white"]
[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Name</th><th>Count</th><th>Capacity</th><th>Type</th><th></th></tr>"]
[h: doc="Name{-count-0,capacity-1,type-2}"]
[h, foreach(itemName, supplyJ), code: {
  [h: supplyInfo = json.get(supplyJ, itemName)]
  [h: itemCount = json.get(supplyInfo, 0)]
  [h: itemCapacity = json.get(supplyInfo, 1)]
  [h: itemType = json.get(supplyInfo, 2)]
   
  [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view",32)]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + itemName + "</td><td>" + itemCount + "</td><td>" + itemCapacity + "</tr><td>" + itemType + "</td><td>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: args = json.append("[]", callerID,returnCall,"New","addSupply@lib:Traveller",json.append("[]",tabReturn),"plus",32)]
[h,macro("makeLink@Lib:Traveller"): args]
[h: newLink=macro.return]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + newLink + "</div></div>"]
[h: macro.return = htmlContent]
