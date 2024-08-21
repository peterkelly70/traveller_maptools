[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]


[h: attacksJ = getProperty("Attacks", callerID)]

[h: args = json.append("[]", callerID, "Attacks","Weapons","token","false")]
[macro("makeDrop@lib:Traveller"): args]
[h: weaponDrop = macro.return]

[h: args = json.append("[]", callerID, "Skills","Skills","token","false")]
[macro("makeDrop@lib:Traveller"): args]
[h: skillDrop = macro.return]

[h: statDrop = getLibProperty("statsList")]


<!-- Append multiple values at once -->
[h: status = input(
  "header|Add Attack||LABEL|SPAN=TRUE",
  "weapon|" + weaponDrop + "|Weapon|LIST|VALUE=STRING",
  "skill|" + skillDrop + "|Skilll|LIST|VALUE=STRING",
  "stat|" + statDrop + "|Statistic|LIST|VALUE=STRING"
)]


[h, if(status), code: {
  [h: nuAtck = json.append("[]",
    skill,
    stat
  )]

  [h: nuAttack = json.set(attacksJ, weapon, nuAtck)]
  [h: message="nuAttack >> " + json.indent(nuAttack)]
  [h: debug("<pre>" + message + "</pre>")]
  [macro ("jsonSort@lib:Traveller"):nuAttack]
  [h: nuAttack=macro.return]
  [h: setProperty("Attacks", nuAttack, callerID)]
  [h: modifersJ = getProperty("Modifiers",callerID)]
  [h: modifiersJ = json.set(modifersJ,weapon,json.append("[]",0,0,0,0,0,0,0,0,0))]
  [h: setProperty("Modifiers",modifiersJ,callerID)]
}]

<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]
