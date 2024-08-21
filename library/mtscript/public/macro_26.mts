[h: callerID=json.get(macro.args,0)]
[h: returnCall="CharSheet"]
[h: jsonName = "Augmentations"]
[h: tabReturn = "Augments"]
[h: baseJson = "augmentsList"]
[h: filter = "true"]

[h: augmentJ = getProperty(jsonName,callerID)]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Augmnets</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

[h: args = json.append("[]", callerID,returnCall,"Add","jsonAdd@lib:Traveller",json.append("[]",tabReturn,jsonName,baseJson,filter),"plus")]
[macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]

[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Type</th><th>TL</th><th>Cost</th><th>Improvement</th><th></th></tr>"]
[h, foreach(augmentType, augmentJ), code: {
  [h: augmentInfo = json.get(augmentJ, augmentType)]
  [h: IMP = json.get(augmentInfo, 0)]
  [h: TL = json.get(augmentInfo, 1)]
  [h: Cost = json.get(augmentInfo, 2)]
  [h: doc = "Type{Improvement,TL,Cost}"]

  [h: itemName = augmentType]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + augmentType + "</td><td>" + TL + "</td><td>" + Cost + "</td><td>" + IMP + "</td><td class='crud'>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink+"</div></div>"]
<!-- Additional tabs -->

[h: macro.return = htmlContent] 
