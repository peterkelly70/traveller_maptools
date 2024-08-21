[h: callerID=json.get(macro.args,0)]
[h: returnCall="AdminSheet"]

[h: jsonName = "suppliesList"]
[h: tabReturn = "Supplies"]

[h: suppliesJ = getProperty(jsonName,callerID)]

[h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,jsonName),"new")]
[macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Supplies</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

[h: doc="Type{TL-0,Weight-1,Cost-2,Amount-3,Effect-4}"]
[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Type</th><th>TL</th><th>Weight</th><th>Cost</th><th>Effect</th><th></th></tr>"]
[h, foreach(suppliesType, suppliesJ), code: {
  [h: suppliesInfo = json.get(suppliesJ, suppliesType)]
  [h: TL = json.get(suppliesInfo, 0)]
  [h: weight = json.get(suppliesInfo, 1)]
  [h: cost = json.get(suppliesInfo, 2)]
  [h: amount = json.get(suppliesInfo, 3)]
  [h: effect = json.get(suppliesInfo, 4)]

  [h: itemName = suppliesType]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + suppliesType + "</td><td>" + TL + "</td><td>" + weight + "</td><td>" + cost + "</td><td>" + effect +"</td><td class='crud'>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink+"</div></div>"]
<!-- Additional tabs -->

[h: macro.return = htmlContent] 
