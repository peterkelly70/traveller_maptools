[h: callerID = json.get(macro.args, 0)]
[h: returnCall = json.get(macro.args, 1)]
[h: tabReturn = json.get(macro.args, 2)]
[h: attackType = json.get(macro.args, 3)]
[h: attacksJ = getProperty("Attacks", callerID)]
[h: attackJ = json.get(attacksJ,attackType)]
[h: curSkill = json.get(attackJ,0)]
[h: curStat = json.get(attackJ,1)]

[h: args = json.append("[]", callerID, "Attacks","Weapons","token","false")]
[macro("makeDrop@lib:Traveller"): args]
[h: weaponDrop = macro.return]

[h: args = json.append("[]", callerID, "Skills","Skills","token","false")]
[macro("makeDrop@lib:Traveller"): args]
[h: skillDrop = macro.return]

[h: statDrop = getLibProperty("statsList")]

<!-- Find the index of the current skill in the skillDrop list -->
[h: skillIndex = listFind(skillDrop, curSkill)]
<!-- Find the index of the current stat in the statDrop list -->
[h: statIndex = listFind(statDrop,curStat)]

<!-- Append multiple values at once -->
[h: status = input(
  "header|Edit "+ attackType +"||LABEL|SPAN=TRUE",
  "skill|" + skillDrop + "|Skilll|LIST|SELECT="+skillIndex+"  VALUE=STRING",
  "stat|" + statDrop + "|Statistic|LIST|SELECT="+statIndex+" VALUE=STRING"
)]


[h, if(status), code: {
  [h: nuAtck = json.append("[]",
    skill,
    stat
  )]

  [h: nuAttack = json.set(attacksJ, attackType, nuAtck)]
  [h: setProperty("Attacks", nuAttack, callerID)]
}]

<!-- Refresh the calling page -->
[h: args = json.append("[]", callerID, tabReturn)]
[macro(returnCall + "@lib:Traveller"): args]
