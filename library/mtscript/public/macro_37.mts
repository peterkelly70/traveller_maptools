[h: callerID=json.get(macro.args,0)]
[h: returnCall="AdminSheet"]
[h: impersonate(callerID)]
[h: armorJ = getProperty("armorList",callerID)]

[h: jsonName = "armorList"]
[h: tabReturn = "Armor"]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>"+tabReturn+"</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

[h: args = json.append("[]", callerID,returnCall,"New","jsonNew@lib:Traveller",json.append("[]",tabReturn,jsonName),"new")]
[macro("makeLink@Lib:Traveller"): args]
[h: newLink=macro.return]


[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Type</th><th>TL</th><th>KD</th><th>ED</th><th>Skill</th><th></th></tr>"]
[h, foreach(armorType, armorJ), code: {
  [h: armorInfo = json.get(armorJ, armorType)]
  [h: TL = json.get(armorInfo, 0)]
  [h: KD = json.get(armorInfo, 1)]
  [h: ED = json.get(armorInfo, 2)]
  [h: RD = json.get(armorInfo, 3)]
  [h: EX = json.get(armorInfo, 4)]
  [h: CR = json.get(armorInfo, 5)]
  [h: CL = json.get(armorInfo, 6)]
  [h: HT = json.get(armorInfo, 7)]
  [h: Skill = json.get(armorInfo, 8)]
  [h: Descr = json.get(armorInfo, 9)]
  [h: KG = json.get(armorInfo, 10)]
  [h: Cost = json.get(armorInfo, 11)]
  [h: doc="Type{TL-0,KD-1,ED-2,RD-3,EX-4,COR-5,CLD-6,HET-7,Skill-8,Desc-9,KG-10,Cst-11}"]

  [h: itemName = armorType]
  
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]

  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + armorType + "</td><td>" + TL + "</td><td>" + KD + "</td><td>" + ED + "</td><td>" + Skill +"</td><td class='crud'>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + newLink+"</div></div>"]
<!-- Additional tabs -->

[h: macro.return = htmlContent] 
