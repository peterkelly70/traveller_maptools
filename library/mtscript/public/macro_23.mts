[h: debug = getLibProperty("debug","lib:Traveller")]
[h, if (debug == 1): broadcast("char_armour Started")]
[h: callerID=json.get(macro.args,0)]
[h: returnCall="CharSheet"]

[h: jsonName = "Armor"]
[h: baseJson = "armorList"]
[h: tabReturn = "Armor"]
[h: filter = "false"]
[h: armorJ = getProperty("Armor",callerID)]
[h, if (debug == 1): broadcast("<pre>Armor >>> "+json.indent(armorJ)+"</pre>")]
[h: defencesL = getProperty("Defences",callerID)]
[h, if (debug == 1): broadcast("<pre>Defences >>> "+defencesL+"</pre>")]
[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Armor</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

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
  [h: doc="Type{TL-0,KD-1,ED-2,RD-3,EX-4,COR-5,CLD-6,HET-7,Skill-8,Desc-9,KG-10,Cst-11,Worn-12}"]

  [h: itemName = armorType]

  [h: worn = if(listFind(defencesL,armorType,",") != -1,1,0)] 
  [h: armorType = if(worn == 1,"<image src='"+tblImage("Icons",12,16)+"'width=16></image>"+armorType,armorType)]
  [h: statArm = if(worn == 1,"Remove","Wear")]
   
 [h: args = json.append("[]", callerID,returnCall,statArm,"toggleArmor@Lib:Traveller",json.append("[]",tabReturn,itemName,worn),"defend")]
  [h, macro("makeLink@Lib:Traveller"): args]
  [h: toggleLink=macro.return]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [h, macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [h, macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [h, macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]
  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + armorType + "</td><td>" + TL + "</td><td>" + KD + "</td><td>" + ED + "</td><td>" + Skill +"</td><td class='crud'>"+toggleLink+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]

[h: args = json.append("[]", callerID,returnCall,"Add","jsonAdd@lib:Traveller",json.append("[]",tabReturn,jsonName,baseJson,filter),"plus")]
[h, if (debug == 1): broadcast("<pre> Send ==> " + json.indent(args) + "</pre>")]
[h, macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]

[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink +"</div></div>"]

<!-- Defences -->
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>Defences</h3></div><table class='scrollable'>"]
[h: row_class = "white"]
[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Type</th></tr>"]
[h, foreach(defence, DefencesL), code: {
    [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + defence + "</td></tr>"]
}]

<!-- Additional tabs -->
[h, if (debug == 1): broadcast("char_armour Stopperd")]
[h: macro.return = htmlContent] 

