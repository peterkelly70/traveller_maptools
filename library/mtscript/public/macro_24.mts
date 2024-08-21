[h: callerID = json.get(macro.args, 0)]
[h: returnCall="CharSheet"]

[h: jsonName = "Weapons"]
[h: baseJson = "weaponsList"]
[h: tabReturn = "Weapons"]
[h: filter = "false"]

[h: weaponsJ = getProperty(jsonName, callerID)]

[h: htmlContent = ""]
[h: htmlContent = htmlContent + "<div class='section'><div class=heading><h3>"+tabReturn+"</h3></div><table class='scrollable'>"]
[h: row_class = "white"]

[h: args = json.append("[]", callerID,returnCall,"Edit","jsonEdit@lib:Traveller",json.append("[]",tabReturn,jsonName),"edit")]
[macro("makeLink@Lib:Traveller"): args]
[h: editLink=macro.return]

[h: args = json.append("[]", callerID,returnCall,"Add","jsonAdd@lib:Traveller",json.append("[]",tabReturn,jsonName,baseJson,filter),"plus")]
[macro("makeLink@Lib:Traveller"): args]
[h: addLink=macro.return]


[h: htmlContent = htmlContent + "<tr class='tblhead'><th>Name</th><th>Range</th><th>Dam</th><th>Mag</th><th>Traits</th><th></th></tr>"]
[h: doc="Name{TL-0,Range-1,Damage-2,Weight-3,Cost-4,Mag-5,MagCost-6,Traits-7}"]
[h, foreach(weaponType, weaponsJ), code: {
  [h: weaponInfo = json.get(weaponsJ, weaponType)]
  [h: TL = json.get(weaponInfo, 0)]
  [h: range = json.get(weaponInfo, 1)]
  [h: damage = json.get(weaponInfo, 2)]
  [h: weight = json.get(weaponInfo, 3)]
  [h: wpCost = json.get(weaponInfo, 4)]
  [h: mag = json.get(weaponInfo, 5)]
  [h: magCost = json.get(weaponInfo, 6)]
  [h: wpTraitS = json.get(weaponInfo, 7)]
 
  [h: itemName = weaponType]
   
   [h: args = json.append("[]", callerID,returnCall,"Edit","editWeapon@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"edit")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: edLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"Delete","jsonDel@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"delete")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: delLink=macro.return]
  
  [h: args = json.append("[]", callerID,returnCall,"View","jsonView@Lib:Traveller",json.append("[]",tabReturn,itemName,jsonName),"view")]
  [macro("makeLink@Lib:Traveller"): args]
  [h: viewLink=macro.return]
    
  [h: rollDamLink = macroLink(damage, "rollDamage@lib:Traveller", "none", args)]
  [h: htmlContent = htmlContent + "<tr class='" + row_class + "'><td>" + weaponType + "</td><td>" + range + "</td><td>" + rollDamLink + "</td><<td>" + mag + "</td><td>" + wpTraits + "</td><td>"+edLink+delLink+viewLink+"</td></tr>"]
  [h: row_class = if(row_class == "black", "white", "black")] 
}]
[h: htmlContent = htmlContent + "</table><div class='crud'>" + addLink + "</div></div>"]

[h: macro.return = htmlContent]
