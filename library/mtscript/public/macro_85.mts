[h: debug = getLibProperty("debug", "lib:Traveller")] 
[h, if(debug == 1): broadcast("admin_statuses Started")]

[h: callerID = json.get(macro.args, 0)]
[h: returnCall = "AdminSheet"]

[h: tabReturn = "admin_statuses"]

[h: lists = json.set("{}", 
    "Statuses", "statusList", 
    "Injuries", "injuryList", 
    "Infections", "infectionList", 
    "Drugs", "drugList"
)]

[h: htmlContent = ""]

[h: row_class = "white"]

[h, foreach(listName, json.fields(lists)), code: {
  [h: listType = json.get(lists, listName)]
  [h: listJ = getLibProperty(listType, "lib:Traveller")] 
  
  [h, if(debug == 1): broadcast("Processing list: " + listName)]  <!-- Debug Output -->
  [h, if(debug == 1): broadcast("List contents: " + json.indent(listJ))]  <!-- Debug Output -->
  
  [h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>" + listName + "</h3></div><table class='scrollable'>"]
  
  [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@lib:Traveller",json.append("[]",tabReturn,listType),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: editLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,listType),"new")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: newLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='tblhead'><th>Name</th><th>Details</th><th>Actions</th></tr>"]
  
  [h, foreach(itemType, json.fields(listJ)), code: {
    [h: itemInfo = json.get(listJ, itemType)]
    
    [h, if(debug == 1): broadcast("Processing item: " + itemType)]  <!-- Debug Output -->
    [h, if(debug == 1): broadcast("Item details: " + json.indent(itemInfo))]  <!-- Debug Output -->
    
    [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemType,listType),"edit")]
    [macro("makeLink@Lib:Traveller"): args]
    [h: edLink=macro.return]
    
    [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemType,listType),"delete")]
    [macro("makeLink@Lib:Traveller"): args]
    [h: delLink=macro.return]
    
    [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemType,listType),"view")]
    [macro("makeLink@Lib:Traveller"): args]
    [h: viewLink=macro.return]

    [h: details = json.indent(itemInfo)]  <!-- Convert item details to a readable string format -->
    
    [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + itemType + "</td><td>" + details + "</td><td>"+edLink+delLink+viewLink+"</td></tr>"]
    [h: row_class = if(row_class == "black", "white", "black")] 
  }]
  
  [h: htmlContent = htmlContent + "</table><div class='crud'>" + newLink + "</div></div>"]
}]

[h: macro.return = htmlContent]
